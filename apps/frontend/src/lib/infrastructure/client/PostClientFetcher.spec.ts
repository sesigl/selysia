import PostClientFetcher from "@/lib/infrastructure/client/PostClientFetcher";
import PostDTO from "@/lib/infrastructure/client/PostDTO";
import { describe, expect, it } from "vitest";
import { PostResponse } from "@/client/post-store/models/PostResponse";

describe("PostClientFetcher", () => {
  it("converts full postDTO into a post", () => {
    let postClientFetcher = new PostClientFetcher();
    const postResponseData: PostResponse = {
      id: "id",
      message: "message",
      userId: "userId",
      createdAt: new Date(),
      publishAt: new Date(),
    };

    const postDTO: PostDTO = {
      ...postResponseData,
      createdAt: postResponseData.createdAt.toISOString(),
      publishAt: postResponseData.publishAt.toISOString(),
    };

    let postResponse = postClientFetcher.toResponse(postDTO);

    expect(postResponse).toEqual(postResponseData);
  });
});
