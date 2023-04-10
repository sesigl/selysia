import React from "react";

import "./css/style.css";

import "./charts/ChartjsConfig";
import Providers from "@/app/user/Providers";
import Sidebar from "@/app/user/partials/Sidebar";
import Header from "@/app/user/partials/Header";
import config from "tailwindcss/defaultConfig";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ComposeMessageButtonAndModal from "@/app/user/ComposeMessageButtonAndModal";
import CockroachUserRepository, {
  ProviderWithDisplayName,
} from "@/lib/infrastructure/cockroach/CockroachUserRepository";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const userRepository = new CockroachUserRepository();
  const providerDisplayNames: ProviderWithDisplayName[] =
    await userRepository.findProviderDisplayNamesByEmail(
      session?.user?.email!!
    );

  return (
    <div className="font-inter antialiased bg-slate-100 text-slate-600">
      <script
        dangerouslySetInnerHTML={{
          __html: `
    if (localStorage.getItem('sidebar-expanded') == 'true') {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
    
    `,
        }}
      ></script>
      <Providers>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header
              username={session?.user?.name ?? "user"}
              userImage={
                session?.user?.image ??
                config.publicAssetBucketBasePath +
                  "/images-user/user-avatar-32.png"
              }
            />

            <main>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
        <ComposeMessageButtonAndModal
          providerWithDisplayNames={providerDisplayNames}
        />
      </Providers>
    </div>
  );
}
