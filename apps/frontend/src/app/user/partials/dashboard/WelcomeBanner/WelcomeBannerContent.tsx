import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function WelcomeBannerContent() {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative">
      <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
        Good afternoon, {session?.user?.name} 👋
      </h1>
      <p>Here is your current content schedule:</p>
    </div>
  );
}
