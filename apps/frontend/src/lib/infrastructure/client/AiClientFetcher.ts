import { getSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import { PromiseDefaultApi } from "@/client/post-store/types/PromiseAPI";
import { createConfiguration } from "@/client/post-store/configuration";
import { ServerConfiguration } from "@/client/post-store/servers";

export default class PostClientFetcher {
  private static postStoreClient: PromiseDefaultApi;

  private postStoreClient: PromiseDefaultApi;

  static new(): PromiseDefaultApi {
    if (PostClientFetcher.postStoreClient !== null) {
      const configuration = createConfiguration({
        baseServer: new ServerConfiguration(
          process.env.NEXT_PUBLIC_POST_STORE_API_URL!!,
          {}
        ),
      });

      PostClientFetcher.postStoreClient = new PromiseDefaultApi(configuration);
    }

    return PostClientFetcher.postStoreClient;
  }

  constructor() {
    this.postStoreClient = PostClientFetcher.new();
  }

  public async generateContentForText(text: string) {
    const session = await this.getSession();

    const jwtToken = this.getCookie("next-auth.session-token");

    return await this.postStoreClient.aiGenerateContent(jwtToken, {
      actor: "tech social media influencer",
      text: text,
    });
  }

  private async getSession() {
    return (await getSession())!!;
  }

  private getCookie(key: string): string {
    return getCookie(key) as string;
  }
}
