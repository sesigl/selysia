"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function LogoutButton({ session }: { session: Session }) {
  return (
    <>
      {session && (
        <>
          <button
            className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-auto"
            onClick={() =>
              signOut({
                callbackUrl: "/",
                redirect: true,
              })
            }
          >
            Sign out
          </button>
        </>
      )}
    </>
  );
}
