import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "@/app/(landing)/user-schedule-test/LogoutButton";
import ScheduleTestTweetComponent from "@/app/(landing)/user-schedule-test/ScheduleTestTweet";
import isProduction from "@/lib/infrastructure/vercel/environment/isProduction";

export default async function User() {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Successfully logged in</h1>
          </div>

          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2">{session?.user?.email}</h2>
          </div>

          {session && !isProduction() && <ScheduleTestTweetComponent />}

          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {session && <LogoutButton session={session} />}
          </div>
        </div>
      </div>
    </section>
  );
}
