import { getProviders } from "next-auth/react";
import LoginProviderList from "@/app/(landing)/partials/LoginProviderList";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Login() {
  //force server side rendering
  cookies();

  const baseUrl = process.env.NEXTAUTH_URL;

  const providers = await getProviders();

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">
              Welcome back. We exist to make content creation easier.
            </h1>
          </div>

          <LoginProviderList providers={providers} baseUrl={baseUrl ?? ""} />

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
      </div>
    </section>
  );
}
