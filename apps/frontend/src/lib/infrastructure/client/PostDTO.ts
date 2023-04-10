import { PostResponse } from "@/client/post-store/models/PostResponse";

export default interface PostDTO
  extends Omit<PostResponse, "publishAt" | "createdAt"> {
  publishAt: string;
  createdAt: string;
}
