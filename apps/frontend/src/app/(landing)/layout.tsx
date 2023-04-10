import "aos/dist/aos.css";
import "./css/style.css";
import React from "react";
import Header from "@/app/(landing)/partials/Header";
import Footer from "@/app/(landing)/partials/Footer";
import PageIllustration from "@/app/(landing)/partials/PageIllustration";
import configuration from "@/configuration";
import type { Metadata } from "next/types";
import getNextOptimizedImageUrl from "@/lib/infrastructure/vercel/environment/getNextOptimizedImageUrl";

// @ts-ignore
export async function generateMetadata() {
  const previewImage =
    configuration.publicAssetBucketBasePath +
    "/images/logo_black_bg_link_external.png";
  const titleOg = "Manage social media content across different platforms";
  const titlePage =
    "Selysia | Manage social media content across different platforms with AI superpowers.";
  const description =
    "Schedule and publish content for multiple platforms intelligently with a single click to maximize your reach.";

  let ogImage = getNextOptimizedImageUrl(previewImage, 1200);
  return {
    title: titlePage,
    keywords: [
      "marketing",
      "social-media",
      "management",
      "ai",
      "intelligent",
      "scheduling",
      "free-tier",
      "affordable",
    ],
    authors: ["Sebastian Sigl"],
    openGraph: {
      title: titleOg,
      description: description,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      title: titleOg,
      images: [{ url: ogImage }],
      card: "summary_large_image",
    },
    icons: ["/favicon.ico"],
  } as Metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`antialiased bg-gray-900 text-gray-200 tracking-tight`}>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        {/*  Page content */}
        <main className="grow">
          {/*  Page illustration */}
          <div
            className="relative max-w-6xl mx-auto h-0 pointer-events-none"
            aria-hidden="true"
          >
            <PageIllustration />
          </div>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
