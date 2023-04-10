"use client";

import React from "react";
import { AppType } from "@/app/user/partials/settings/AppsPanel";

export default function ConnectButton({ userApp }: { userApp: AppType }) {
  return (
    <button
      type="submit"
      disabled={userApp.connected || userApp.disabled}
      className="btn-sm border-slate-200 hover:border-slate-300 shadow-sm flex items-center"
    >
      {userApp.connected && (
        <>
          <svg
            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
            viewBox="0 0 12 12"
          >
            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
          </svg>
          <span>Connected</span>
        </>
      )}

      {!userApp.connected && !userApp.disabled && (
        <>
          <span>Click to Connected</span>
        </>
      )}

      {!userApp.connected && userApp.disabled && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x mr-2"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#ff2825"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span>Not Ready</span>
        </>
      )}
    </button>
  );
}
