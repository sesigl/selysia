"use client";

import React, { useContext, useEffect, useState } from "react";
import TwitterPreview from "@/app/user/components/post-editor/TwitterPreview";
import PreviewTab from "@/app/user/components/post-editor/PreviewTab";
import LinkedInPreview from "@/app/user/components/post-editor/LinkedInPreview";
import TwitterEditorSvg from "@/app/user/components/post-editor/TwitterEditorSvg";
import LinkedInEditorSvg from "@/app/user/components/post-editor/LinkedInEditorSvg";
import { ProviderWithDisplayName } from "@/lib/infrastructure/cockroach/CockroachUserRepository";
import { SchedulePostModalContext } from "@/app/user/SchedulePostModalProvider";
import Datepicker from "@/app/user/components/Datepicker";
import AiTextarea from "@/app/user/components/post-editor/AiTextarea";

type PostPreviewType = "twitter" | "linkedin";

export default function CommentEditor({
  providerWithDisplayNames,
}: {
  providerWithDisplayNames: ProviderWithDisplayName[];
  onContentChange?: (content: string) => void;
}) {
  const { postContent, setPostContent } = useContext(SchedulePostModalContext);

  const [_commentLength, setCommentLength] = useState(postContent.length);
  useEffect(() => {
    setCommentLength(postContent.length);
  }, [postContent]);

  const [previewActiveType, setPreviewActiveType] =
    useState<PostPreviewType>("twitter");

  return (
    <div className="flex md:flex-row flex-col ">
      <div className="flex-1">
        <div className="flex w-full">
          <label
            className="block text-sm font-medium mb-1 mt-2 h-8"
            htmlFor="feedback"
          >
            Message <span className="text-rose-500">*</span>
          </label>
          <Datepicker className="self-end" />
        </div>

        <AiTextarea
          className={
            "form-textarea w-full px-2 py-1 min-h-10 h-10 break-all border-slate-200"
          }
          style={{ minHeight: "9rem", height: "100%" }}
          placeholder={"What do you want to share?"}
          rows={4}
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        />
      </div>
      <div className="ml-4 pr-4 border-l-1 w-0"></div>
      <div className="flex-1">
        <div className="flex justify-between mx-2">
          <label
            className="block text-sm font-medium mb-1 mt-2 h-8"
            htmlFor="feedback"
          >
            Preview
          </label>
          <div>
            <ul className="text-sm font-medium flex flex-nowrap -ml-4 sm:-ml-6 lg:-ml-8 mt-2 overflow-x-scroll no-scrollbar">
              <li
                className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8"
                onClick={() => setPreviewActiveType("twitter")}
              >
                <PreviewTab
                  isActive={previewActiveType === "twitter"}
                  name={"Twitter"}
                  svgIcon={<TwitterEditorSvg />}
                />
              </li>
              <li
                className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8"
                onClick={() => setPreviewActiveType("linkedin")}
              >
                <PreviewTab
                  isActive={previewActiveType === "linkedin"}
                  name={"LinkedIn"}
                  svgIcon={<LinkedInEditorSvg />}
                />
              </li>
            </ul>
          </div>
        </div>

        {previewActiveType === "twitter" && (
          <TwitterPreview content={postContent.split("\n\n\n")} />
        )}

        {previewActiveType === "linkedin" && (
          <LinkedInPreview
            content={postContent.split("\n\n\n")}
            providerWithDisplayNames={providerWithDisplayNames}
          />
        )}
      </div>
    </div>
  );
}
