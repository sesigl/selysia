"use client";

import React, { createContext, useState } from "react";

export const SchedulePostModalContext =
  createContext<SchedulePostModalContextType>({
    schedulePostModalOpen: false,
    existingPostId: null,
    publishDate: new Date(),
    setSchedulePostModalOpen: () => {},
    postContent: "",
    setPostContent: () => {},
    setPublishDate: () => {},
  });
type SchedulePostModalContextType = {
  schedulePostModalOpen: boolean;
  existingPostId: string | null;
  publishDate: Date;
  postContent: string;

  setSchedulePostModalOpen: (
    open: boolean,
    existingPostId: string | null,
    postContent: string | null,
    publishDate: Date | null
  ) => void;
  setPostContent: (content: string) => void;
  setPublishDate: (date: Date | null) => void;
};

export default function SchedulePostModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [schedulePostModalOpen, setSchedulePostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [publishDate, setPublishDate] = useState<Date>(new Date());
  const [existingPostId, setExistingPostId] = useState<string | null>(null);

  const store: SchedulePostModalContextType = {
    schedulePostModalOpen: schedulePostModalOpen,
    existingPostId: existingPostId,
    postContent: postContent,
    publishDate: publishDate,
    setSchedulePostModalOpen: (
      open,
      existingPostId,
      postContent,
      publishDate
    ) => {
      setSchedulePostModalOpen(open);
      setExistingPostId(existingPostId);
      setPostContent(postContent ?? "");
      setPublishDate(publishDate ?? new Date());
    },
    setPostContent: setPostContent,
    setPublishDate: (date) => {
      setPublishDate(date ?? new Date());
    },
  };

  return (
    <SchedulePostModalContext.Provider value={store}>
      {children}
    </SchedulePostModalContext.Provider>
  );
}
