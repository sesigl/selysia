import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import PostDTO from "@/lib/infrastructure/client/PostDTO";
import { PromiseDefaultApi } from "@/client/post-store/types/PromiseAPI";
import { createConfiguration } from "@/client/post-store/configuration";
import { ServerConfiguration } from "@/client/post-store/servers";

export default class PostServerFetcher {
  private static postStoreClient: PromiseDefaultApi;

  private postStoreClient: PromiseDefaultApi;

  static new(): PromiseDefaultApi {
    if (PostServerFetcher.postStoreClient !== null) {
      const configuration = createConfiguration({
        baseServer: new ServerConfiguration(
          process.env.NEXT_PUBLIC_POST_STORE_API_URL!!,
          {}
        ),
      });

      PostServerFetcher.postStoreClient = new PromiseDefaultApi(configuration);
    }

    return PostServerFetcher.postStoreClient;
  }

  constructor() {
    this.postStoreClient = PostServerFetcher.new();
  }

  public async get(): Promise<PostDTO[]> {
    const session = await this.getSession();

    const jwtToken = await this.getCookie("next-auth.session-token");

    let postResponses = await this.postStoreClient.get(
      session?.user.id!!,
      jwtToken
    );

    return postResponses.map((p) => ({
      ...p,
      publishAt: p.publishAt.toISOString(),
      createdAt: p.createdAt.toISOString(),
    }));
  }

  private async getSession() {
    return (await getServerSession(authOptions))!!;
  }

  private async getCookie(key: string): Promise<string> {
    return cookies().get(key)?.value!!;
  }
}
