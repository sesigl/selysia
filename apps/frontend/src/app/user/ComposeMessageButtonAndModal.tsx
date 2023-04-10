"use client";
import ModalBasic from "@/app/user/components/ModalBasic";
import React, { useContext } from "react";
import PostEditor from "./components/post-editor/PostEditor";
import { ProviderWithDisplayName } from "@/lib/infrastructure/cockroach/CockroachUserRepository";
import PostClientFetcher from "@/lib/infrastructure/client/PostClientFetcher";
import { PostScheduleContext } from "@/app/user/PostScheduleProvider";
import { SchedulePostModalContext } from "@/app/user/SchedulePostModalProvider";

export default function ComposeMessageButtonAndModal({
  providerWithDisplayNames,
}: {
  providerWithDisplayNames: ProviderWithDisplayName[];
}) {
  const {
    setSchedulePostModalOpen,
    schedulePostModalOpen,
    existingPostId,
    postContent,
    publishDate,
  } = useContext(SchedulePostModalContext);
  const { refreshPosts } = useContext(PostScheduleContext);

  function updateModalState(open: boolean) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setSchedulePostModalOpen(open, null, null, tomorrow);
  }

  return (
    <>
      <button
        className="fixed bottom-10 right-10 btn bg-indigo-500 hover:bg-indigo-600 text-white"
        onClick={() => {
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          setSchedulePostModalOpen(true, null, null, tomorrow);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler classNametabler-message"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="14" y2="13" />
        </svg>
        <span className="ml-2 text-lg">Compose</span>
      </button>
      <ModalBasic
        id="feedback-modal"
        modalOpen={schedulePostModalOpen}
        setModalOpen={(open: boolean) => {
          updateModalState(open);
        }}
        title="Compose a post"
      >
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <PostEditor providerWithDisplayNames={providerWithDisplayNames} />
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.stopPropagation();
                setSchedulePostModalOpen(false, null, null, null);
              }}
            >
              Cancel
            </button>
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={async () => {
                setTimeout(async () => {
                  const postClientFetcher = new PostClientFetcher();
                  let now = new Date();
                  // just schedule tomorrow
                  now.setDate(now.getDate() + 1);

                  if (existingPostId != null) {
                    await postClientFetcher.update(
                      existingPostId,
                      postContent,
                      publishDate
                    );
                  } else {
                    await postClientFetcher.create(postContent, publishDate);
                  }

                  refreshPosts();
                  setSchedulePostModalOpen(false, null, null, null);
                }, 100); // useState requires time to update the date, hence the previous date would be sent
              }}
            >
              Send
            </button>
          </div>
        </div>
      </ModalBasic>
    </>
  );
}
