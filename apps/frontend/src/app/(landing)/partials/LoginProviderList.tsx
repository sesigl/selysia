"use client";

import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";
import { ReactNode, useState } from "react";
import { getCsrfToken } from "next-auth/react";
import LinkedInSvg from "@/app/(landing)/partials/providers/LinkedInSvg";
import TwitterSvg from "@/app/(landing)/partials/providers/TwitterSvg";
import FacebookSvg from "@/app/(landing)/partials/providers/FacebookSvg";
import InstagramSvg from "@/app/(landing)/partials/providers/InstagramSvg";

const providerLayout: Record<
  string,
  { symbol: ReactNode; color: string; colorHover: string }
> = {
  google: {
    symbol: (
      <svg
        className="w-7 h-7 fill-current text-white opacity-75 shrink-0 mx-4"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
      </svg>
    ),
    color: "bg-red-600",
    colorHover: "hover:bg-red-700",
  },

  facebook: {
    symbol: <FacebookSvg />,
    color: "bg-sky-600",
    colorHover: "hover:bg-sky-700",
  },

  instagram: {
    symbol: <InstagramSvg />,
    color: "bg-pink-600",
    colorHover: "hover:bg-pink-700",
  },

  github: {
    symbol: (
      <svg
        className="w-7 h-7 fill-current text-white opacity-75 shrink-0 mx-4"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
      </svg>
    ),
    color: "bg-zinc-600",
    colorHover: "hover:bg-zinc-700",
  },

  linkedin: {
    symbol: <LinkedInSvg />,
    color: "bg-sky-500",
    colorHover: "hover:bg-sky-600",
  },

  twitter: {
    symbol: <TwitterSvg />,
    color: "bg-sky-300",
    colorHover: "hover:bg-sky-400",
  },
};

export default function LoginProviderList({
  baseUrl,
  providers,
}: {
  baseUrl: string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  const [token, setToken] = useState<string | undefined>("");
  getCsrfToken().then((tokenResp) => setToken(tokenResp));

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          {Object.values(providers ?? []).map((provider) => (
            <div key={provider.id} className="provider">
              <form
                action={`${baseUrl}/api/auth/signin/${provider.id}`}
                method="POST"
              >
                <input type="hidden" name="csrfToken" value={token} />
                <input
                  type="hidden"
                  name="callbackUrl"
                  value={`${baseUrl}/user`}
                />
                <button
                  type="submit"
                  key={provider.name}
                  className={`btn px-0 my-1 text-white ${
                    providerLayout[provider.id].color
                  } ${
                    providerLayout[provider.id].colorHover
                  } w-full relative flex items-center`}
                >
                  {providerLayout[provider.id].symbol}
                  <span
                    className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                    aria-hidden="true"
                  ></span>
                  <span className="flex-auto pl-16 pr-8 -ml-16">
                    Sign in with {provider.name.replace("(Legacy)", "")}
                  </span>
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
