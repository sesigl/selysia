import React, { ReactNode } from "react";
import TwitterSvg from "@/app/(landing)/partials/providers/TwitterSvg";
import LinkedInSvg from "@/app/(landing)/partials/providers/LinkedInSvg";
import { getPrismaClient } from "@/lib/infrastructure/prisma/prismadb";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Facebook from "next-auth/providers/facebook";
import FacebookSvg from "@/app/(landing)/partials/providers/FacebookSvg";
import InstagramSvg from "@/app/(landing)/partials/providers/InstagramSvg";
import UnknownProviderSvg from "@/app/(landing)/partials/providers/UnknownProviderSvg";
import CsrfTokenInput from "@/app/user/partials/settings/CsrfTokenInput";
import ConnectButton from "@/app/user/partials/settings/ConnectButton";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export type AppType = {
  authProviderId: string;
  name: string;
  description: string;
  connected: boolean;
  disabled: boolean;
  rating: number;
  usage: string;
  icon: ReactNode;
};

const apps: AppType[] = [
  {
    authProviderId: "twitter",
    connected: false,
    name: "Twitter",
    description:
      "Send single and multiple Tweets with rich media to your followers.",
    icon: <TwitterSvg />,
    disabled: false,
    rating: 4.9,
    usage: "1K+",
  },
  {
    authProviderId: "linkedin",
    connected: false,
    name: "LinkedIn",
    description: "Select a LinkedIn page and publish posts to your followers",
    icon: <LinkedInSvg />,
    disabled: false,
    rating: 4.1,
    usage: "1K+",
  },
  {
    authProviderId: "facebook",
    connected: false,
    name: "Facebook",
    description:
      "Facebook is not supported because meta requires a business verification. This is a private project for now and facebook will be available once I know the idea is valuable and founding a company pays off.",
    icon: <FacebookSvg />,
    disabled: true,
    rating: 0,
    usage: "0",
  },
  {
    authProviderId: "instagram",
    connected: false,
    name: "Instagram",
    description:
      "Facebook is not supported because meta requires a business verification. This is a private project for now and facebook will be available once I know the idea is valuable and founding a company pays off.",
    icon: <InstagramSvg />,
    disabled: true,
    rating: 0,
    usage: "0",
  },
  {
    authProviderId: "tiktok",
    connected: false,
    name: "TikTok",
    description:
      "TikTok is not yet supported by NextAuth.js. The good message is some people are already working on it. So most certainly soon it be available.",
    icon: <UnknownProviderSvg />,
    disabled: true,
    rating: 0,
    usage: "0",
  },
  {
    authProviderId: "mastodon",
    connected: false,
    name: "Mastodon",
    description:
      "Mastodon is not yet supported by NextAuth.js. The good message is some people are already working on it. So most certainly soon it be available.",
    icon: <UnknownProviderSvg />,
    disabled: true,
    rating: 0,
    usage: "0",
  },
];

async function getUser(prismaClient: PrismaClient, session: Session | null) {
  return await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: {
      accounts: true,
    },
  });
}

async function AppsPanel({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const prismaClient = getPrismaClient();

  const session = await getServerSession(authOptions);
  let user = await getUser(prismaClient, session);

  const deleteAccountId = searchParams["deleteAccount"];

  if (user && deleteAccountId) {
    const accountToDelete = user.accounts.find(
      (acc) => acc.id === deleteAccountId
    );

    if (accountToDelete) {
      await prismaClient.account.delete({
        where: {
          id: accountToDelete.id,
        },
      });

      user = await getUser(prismaClient, session);
    }
  }

  const connectedProviderIds = user
    ? user.accounts.map((account) => account.provider)
    : [];

  const userApps = apps.map((app) => {
    const account = user?.accounts.find((account) => account.provider);
    return {
      ...app,
      connected: connectedProviderIds.includes(app.authProviderId),
      accountId: account?.id,
    };
  });

  const baseUrl = process.env.NEXTAUTH_URL;

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">
          Connected Apps
        </h2>

        {/* General */}
        <div className="mb-6">
          {/* Filters */}
          <div className="mb-4 border-b border-slate-200">
            <ul className="text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
              <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                <a className="text-indigo-500 whitespace-nowrap" href="#0">
                  View All
                </a>
              </li>
            </ul>
          </div>
        </div>
        <section className="pb-6 border-b border-slate-200">
          <div className="grid grid-cols-12 gap-6">
            {userApps.map((userApp) => (
              <form
                action={`${baseUrl}/api/auth/signin/${userApp.authProviderId}`}
                method="POST"
                key={userApp.authProviderId}
                className="relative col-span-full xl:col-span-6 2xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200"
              >
                {userApp.disabled ? (
                  <div className="bg-black h-full w-full opacity-10 absolute"></div>
                ) : (
                  <></>
                )}
                <CsrfTokenInput />
                <input
                  type="hidden"
                  name="callbackUrl"
                  value={`${baseUrl}/user/settings/apps`}
                />
                {/* Card content */}
                <div className="flex flex-col h-full p-5">
                  <div className="grow">
                    <header className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full shrink-0  mr-3">
                        <div className="mt-1.5 -ml-2">{userApp.icon}</div>
                      </div>
                      <h3 className="text-lg text-slate-800 font-semibold">
                        {userApp.name} {userApp.disabled ? "(Disabled)" : ""}
                      </h3>
                    </header>
                    <div className="text-sm">{userApp.description}</div>
                  </div>
                  {/* Card footer */}
                  <footer className="mt-4">
                    <div className="flex flex-wrap justify-between items-center">
                      {/* Left side */}
                      <div className="flex space-x-3">
                        <div className="flex items-center text-slate-400">
                          <svg
                            className="w-4 h-4 shrink-0 fill-current mr-1.5"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                          </svg>
                          <div className="text-sm text-slate-500">
                            {userApp.usage}
                          </div>
                        </div>
                        <div className="flex items-center text-amber-500">
                          <svg
                            className="w-4 h-4 shrink-0 fill-current mr-1.5"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                          </svg>
                          <div className="text-sm text-amber-600">
                            {userApp.rating}
                          </div>
                        </div>
                      </div>
                      <div className={"flex"}>
                        {userApp.connected && (
                          <Link
                            href={`/user/settings/apps?deleteAccount=${userApp.accountId}`}
                          >
                            <button className="btn-sm self-end mr-2 btn bg-rose-500 hover:bg-rose-600 text-white flex items-center cursor-pointer">
                              Disconnect
                            </button>
                          </Link>
                        )}
                        <ConnectButton userApp={userApp} />
                      </div>

                      {/* Right side */}
                    </div>
                  </footer>
                </div>
              </form>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AppsPanel;
