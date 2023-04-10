"use client";

import React, { createContext, useEffect, useState } from "react";
import PostClientFetcher from "@/lib/infrastructure/client/PostClientFetcher";
import { PostResponse } from "@/client/post-store/models/PostResponse";

export const PostScheduleContext = createContext<PostScheduleContextType>({
  posts: [],
  refreshPosts: () => {},
});
type PostScheduleContextType = {
  posts: PostResponse[];
  refreshPosts: () => void;
};

export default function PostScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  function refreshPosts() {
    const postClientFetcher = new PostClientFetcher();
    postClientFetcher.getAllForCurrentUser().then((posts) => setPosts(posts));
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  const store: PostScheduleContextType = {
    posts: posts,
    refreshPosts: refreshPosts,
  };

  return (
    <PostScheduleContext.Provider value={store}>
      {children}
    </PostScheduleContext.Provider>
  );
}
