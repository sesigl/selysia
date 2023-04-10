import { getPrismaClient } from "@/lib/infrastructure/prisma/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import TwitterApi from "twitter-api-v2";
import { TwitterApiTokens } from "twitter-api-v2/dist/esm/types";
import { Account } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next/types";

const FB = require("fb");

async function publishContentFacebook(account: Account, text: string) {
  FB.setAccessToken(account.access_token);

  FB.api("/me/accounts", function (res: any) {
    if (!res || res.error) {
      console.error(!res ? "Error occurred" : res.error);
      return;
    }

    // Find the page you want to publish posts to and get its access token
    const page = res.data.find((page: any) => page.name === "Page Name");
    // const PAGE_ACCESS_TOKEN = page.access_token;

    // Use the page access token to publish a post to the page
    FB.api(
      "/" + page.id + "/feed",
      "post",
      { message: text },
      function (res: any) {
        if (!res || res.error) {
          console.error(!res ? "Error occurred" : res.error);
          return;
        }
      }
    );
  });
}

export async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  const payload = JSON.parse(request.body);

  if (session) {
    const prisma = getPrismaClient();

    const userEmail = session.user?.email;

    let user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
      include: {
        accounts: true,
      },
    });

    if (user) {
      const promises = user.accounts.map(async (account) => {
        if (account.provider === "twitter") {
          //await sendTwitterTweet(account, payload.text);
        }

        if (account.provider === "facebook") {
          await publishContentFacebook(account, payload.text);
        }

        if (account.provider === "linkedin") {
          //await publishContentLinkedIn(account, payload.text);
        }
      });

      await Promise.all(promises);
    }

    response.status(200).json({ ...payload, updated: 1 });
  } else {
    // Not Signed in
    response.status(401);
  }
  response.end();
}

async function sendTwitterTweet(account: Account, text: string) {
  const twitterApiTokens: TwitterApiTokens = {
    appKey: process.env.TWITTER_API_KEY!!,
    appSecret: process.env.TWITTER_API_SECRET!!,
    // Following access tokens are not required if you are
    // at part 1 of user-auth process (ask for a request token)
    // or if you want a app-only client (see below)
    accessToken: account.oauth_token!!,
    accessSecret: account.oauth_token_secret!!,
  };

  const userClient = new TwitterApi(twitterApiTokens, {});
  await userClient.v1.tweet(text);
}

function publishContentLinkedIn(account: Account, text: string) {
  const linkedinId = account.providerAccountId;
  const bearerToken = account.access_token;
  const url = "https://api.linkedin.com/v2/posts";
  const body = {
    author: "urn:li:person:" + linkedinId,
    commentary: text,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };
  const headers = {
    Authorization: "Bearer " + bearerToken,
    "cache-control": "no-cache",
    "X-Restli-Protocol-Version": "2.0.0",
    "x-li-format": "json",
  };

  return fetch(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: headers,
  }).catch(console.error);
}

export default handler;
