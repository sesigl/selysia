import NextAuth, { Account, DefaultUser, Profile } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import LinkedInProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";
import TwitterProvider, {
  TwitterLegacyProfile,
} from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getPrismaClient } from "@/lib/infrastructure/prisma/prismadb";
import { PrismaClient } from "@prisma/client";
import { AuthOptions, Awaitable, CallbacksOptions } from "next-auth/core/types";
import configuration from "@/configuration";
import jwt from "jsonwebtoken";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & {
      id: string;
    };
  }
}

async function updateAccountDisplayName(
  account: Account,
  profile: Profile,
  prisma: PrismaClient
) {
  let displayName;
  if (account.provider === "twitter") {
    let providerProfile: TwitterLegacyProfile = profile as TwitterLegacyProfile;

    displayName = "@" + providerProfile.screen_name;
  } else if (account.provider === "linkedin") {
    let providerProfile: LinkedInProfile = profile as LinkedInProfile;
    displayName = `${providerProfile.localizedFirstName} ${providerProfile.localizedLastName}`;
  }

  if (displayName) {
    await prisma.accountDetail.upsert({
      where: {
        account_provider_account_providerAccountId: {
          account_provider: account.provider,
          account_providerAccountId: account.providerAccountId,
        },
      },
      update: {
        display_name: displayName,
      },
      create: {
        account_provider: account.provider,
        account_providerAccountId: account.providerAccountId,
        display_name: displayName,
      },
    });
  }
}

const signInCallback: CallbacksOptions["signIn"] = async function signIn({
  account,
  profile,
}) {
  const prisma = getPrismaClient();

  if (account && profile) {
    await updateAccountDisplayName(account, profile, prisma);
  }

  return true;
};

const maxAgeInSeconds = 60 * 60 * 24 * 30;
export const authOptions: AuthOptions = {
  // @ts-ignore // next auth prisma docs: https://next-auth.js.org/adapters/prisma
  adapter: PrismaAdapter(getPrismaClient()),

  session: {
    strategy: "jwt",
    maxAge: maxAgeInSeconds,
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: false,
        sameSite: "lax",
        domain:
          process.env.NODE_ENV === "production"
            ? configuration.domain
            : `localhost`,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  jwt: {
    maxAge: maxAgeInSeconds,
    async encode(data: JWTEncodeParams) {
      return jwt.sign(
        data.token!!,
        data.secret,
        data.token?.["exp"] ? undefined : { expiresIn: maxAgeInSeconds }
      );
    },
    async decode(data: JWTDecodeParams) {
      return jwt.verify(data.token!!, data.secret) as Awaitable<JWT | null>;
    },
  },

  callbacks: {
    signIn: signInCallback,
    async session({ session, user, token }) {
      if (!token.sub) {
        throw new Error("JWT sub not defined");
      }

      session.user.id = token.sub;
      return session;
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!!,
      clientSecret: process.env.GITHUB_SECRET!!,
      allowDangerousEmailAccountLinking: true,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY!!,
      clientSecret: process.env.TWITTER_API_SECRET!!,
      allowDangerousEmailAccountLinking: true,
      version: "1.0A",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!!,
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: { scope: "r_liteprofile r_emailaddress w_member_social" },
      },
    }),

    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!!,
      allowDangerousEmailAccountLinking: true,
      authorization:
        "https://www.facebook.com/v15.0/dialog/oauth?scope=email,pages_show_list,pages_manage_posts,pages_read_engagement,publish_to_groups",
    }),
  ],
};

export default NextAuth(authOptions);
