// @ts-nocheck

import {
  getCsrfToken,
  getProviders,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import LoginProviderList from "@/app/(landing)/partials/LoginProviderList";
import Link from "next/link";

function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() =>
          signIn(undefined, {
            redirect: true,
            callbackUrl: "http://localhost:3000/user",
          })
        }
      >
        Sign in
      </button>
    </>
  );
}

function Page({ providers, csrfToken }) {
  const session = useSession();
  return (
    <section className="relative">
      <div>Access Token: {session.data?.user?.email}</div>
      <LoginButton />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <form>
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">
                Welcome back. We exist to make content creation easier.
              </h1>
            </div>

            <LoginProviderList
              providers={providers}
              csrfToken={csrfToken}
              baseUrl={process.env.NEXTAUTH_URL}
            />

            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account?{" "}
              <Link
                href="/sign-up"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
            {/* Form */}
          </div>
        </form>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers: providers,
      csrfToken: csrfToken,
    }, // will be passed to the page component as props
  };
}

export default Page;
