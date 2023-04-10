import { useSession } from "next-auth/react";
import config from "tailwindcss/defaultConfig";
import Image from "next/image";

export default function TwitterPreview({ content }: { content: string[] }) {
  const session = useSession();
  const messages = content;

  const name = session.data?.user?.name!!;

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 px-6 divide-y divide-slate-200">
      {messages.map((message, index) => {
        return (
          <div key={message + index} className="py-6">
            {/* Header */}
            {
              <header className="flex items-start">
                {/* Avatar */}
                <Image
                  className="rounded-full shrink-0 mr-3"
                  src={session.data?.user?.image!!}
                  placeholder={"blur"}
                  blurDataURL={
                    config.publicAssetBucketBasePath +
                    "/images-user/user-avatar-32.png"
                  }
                  width="40"
                  height="40"
                  alt={name}
                />
                {/* Meta */}
                <div className="grow self-center">
                  <div className="sm:flex items-start justify-between mb-0.5">
                    {/* Message author */}
                    <div className="xl:flex items-center mb-2 sm:mb-0">
                      <button className="text-sm font-semibold text-slate-800 text-left truncate">
                        {name}
                      </button>

                      <>
                        <div className="text-sm text-slate-400 hidden xl:block mx-1"></div>
                      </>
                    </div>
                    {message.length > 280 ? (
                      <div className={"text-xs text-rose-500 font-bold"}>
                        {message.length}/280
                      </div>
                    ) : (
                      <div className={"text-xs"}>{message.length}/280</div>
                    )}
                  </div>
                </div>
              </header>
            }
            {/* Body */}
            <div
              className={
                "text-sm text-slate-800 space-y-2 whitespace-pre-line " + "mt-4"
              }
            >
              {message}
            </div>
          </div>
        );
      })}
    </div>
  );
}
