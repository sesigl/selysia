import React from "react";
import { AnalyticsWrapper } from "@/app/(landing)/partials/analytics";
import Script from "next/script";

import { Metadata } from "next/types";
import { Architects_Daughter, Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "fallback",
});

const architectsDaughter = Architects_Daughter({
  weight: ["400"],
  display: "fallback",
  variable: "--font-architects-daughter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Selysia | Manage social media content across different platforms with AI superpowers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body
        className={`${architectsDaughter.variable} ${inter.variable} font-sans`}
      >
        {children}

        <AnalyticsWrapper />
        <Script
          type="text/javascript"
          src="https://app.termly.io/embed.min.js"
          data-auto-block="on"
          data-website-uuid="f7122f03-53a1-47bb-b60d-7436433e9172"
        ></Script>
      </body>
    </html>
  );
}
