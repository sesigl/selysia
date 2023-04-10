"use client";

import { SessionProvider } from "next-auth/react";
import SidebarProvider from "@/app/user/SidebarProvider";
import React, { ReactNode } from "react";
import PostScheduleProvider from "@/app/user/PostScheduleProvider";
import SchedulePostModalProvider from "@/app/user/SchedulePostModalProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <PostScheduleProvider>
        <SchedulePostModalProvider>
          <SessionProvider>{children}</SessionProvider>
        </SchedulePostModalProvider>
      </PostScheduleProvider>
    </SidebarProvider>
  );
}
