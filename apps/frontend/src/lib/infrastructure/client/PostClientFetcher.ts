import { getSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import PostDTO from "@/lib/infrastructure/client/PostDTO";
import { PromiseDefaultApi } from "@/client/post-store/types/PromiseAPI";
import { createConfiguration } from "@/client/post-store/configuration";
import { ServerConfiguration } from "@/client/post-store/servers";
import { CreateOrUpdatePostRequest } from "@/client/post-store/models/CreateOrUpdatePostRequest";
import { PostResponse } from "@/client/post-store/models/PostResponse";

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

  public async getAllForCurrentUser() {
    const session = await this.getSession();

    const jwtToken = this.getCookie("next-auth.session-token");

    return await this.postStoreClient.get(session?.user.id!!, jwtToken);
  }

  public async create(message: string, publishDate: Date) {
    const jwtToken = this.getCookie("next-auth.session-token");

    let createOrUpdatePostRequest = new CreateOrUpdatePostRequest();
    createOrUpdatePostRequest.message = message;
    createOrUpdatePostRequest.publishAt = publishDate;

    return await this.postStoreClient.post(jwtToken, createOrUpdatePostRequest);
  }

  public async update(
    existingPostId: string,
    message: string,
    publishDate: Date
  ) {
    const jwtToken = this.getCookie("next-auth.session-token");

    let createOrUpdatePostRequest = new CreateOrUpdatePostRequest();
    createOrUpdatePostRequest.message = message;
    createOrUpdatePostRequest.publishAt = publishDate;

    return await this.postStoreClient.put(
      existingPostId,
      jwtToken,
      createOrUpdatePostRequest
    );
  }

  public async delete(id: string) {
    const jwtToken = this.getCookie("next-auth.session-token");

    return await this.postStoreClient._delete(id, jwtToken);
  }

  public toResponse(postDTO: PostDTO) {
    let postResponse = new PostResponse();
    postResponse.publishAt = new Date(Date.parse(postDTO.publishAt));
    postResponse.createdAt = new Date(Date.parse(postDTO.createdAt));

    postResponse.id = postDTO.id;
    postResponse.message = postDTO.message;
    postResponse.userId = postDTO.userId;

    return postResponse;
  }

  private async getSession() {
    return (await getSession())!!;
  }

  private getCookie(key: string): string {
    return getCookie(key) as string;
  }
}
