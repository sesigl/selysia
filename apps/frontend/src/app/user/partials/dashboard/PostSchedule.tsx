"use client";

import React, { useContext, useEffect, useState } from "react";
import EditMenu from "../../components/DropdownEditMenu";
import { format } from "date-fns";
// Import utilities
import Image from "next/image";
import config from "../../../../configuration";
import PostClientFetcher from "@/lib/infrastructure/client/PostClientFetcher";
import { PostScheduleContext } from "@/app/user/PostScheduleProvider";
import { SchedulePostModalContext } from "@/app/user/SchedulePostModalProvider";
import PostDTO from "@/lib/infrastructure/client/PostDTO";
import { PostResponse } from "@/client/post-store/models/PostResponse";
import configuration from "../../../../configuration";

const postClientFetcher = new PostClientFetcher();

function PostSchedule({ posts: ssrPosts }: { posts: PostDTO[] }) {
  const [posts, setPosts] = useState<PostResponse[]>(
    ssrPosts.map((p) => postClientFetcher.toResponse(p))
  );

  const { posts: postsFromContext } = useContext(PostScheduleContext);
  const { setSchedulePostModalOpen } = useContext(SchedulePostModalContext);
  useEffect(() => {
    if (postsFromContext.length > 0) {
      setPosts(postsFromContext);
    }
  }, [postsFromContext]);

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200"
        >
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <div className="flex">
                {/* Icon */}
                <Image
                  src={
                    config.publicAssetBucketBasePath +
                    "/images-user/icon-01.svg"
                  }
                  width="32"
                  height="32"
                  alt="Icon 01"
                />
                <h2 className="text-lg font-semibold text-slate-800 mt-0.5 ml-2">
                  {format(
                    new Date(post.publishAt),
                    configuration.datetimeFormat
                  )}
                </h2>
              </div>
              {/* Menu button */}
              <EditMenu align="right" className="relative inline-flex">
                <li
                  onClick={() => {
                    setSchedulePostModalOpen(
                      true,
                      post.id,
                      post.message,
                      post.publishAt
                    );
                  }}
                >
                  <span className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3">
                    Edit
                  </span>
                </li>
                <li
                  onClick={() => {
                    setPosts((posts) => posts.filter((p) => p.id !== post.id));
                    postClientFetcher.delete(post.id!!);
                  }}
                >
                  <span className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3 cursor-pointer">
                    Remove
                  </span>
                </li>
              </EditMenu>
            </header>

            {/* body */}
            <div className="text-sm text-slate-800 space-y-2 mb-5">
              <p>{post.message}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PostSchedule;
