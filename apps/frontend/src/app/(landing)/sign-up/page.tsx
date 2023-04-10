import LoginProviderList from "@/app/(landing)/partials/LoginProviderList";
import { getProviders } from "next-auth/react";
import { cookies } from "next/headers";

export default async function Signup() {
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
              Welcome. We exist to make content creation easier.
            </h1>
          </div>

          <LoginProviderList providers={providers} baseUrl={baseUrl ?? ""} />
        </div>
      </div>
    </section>
  );
}
