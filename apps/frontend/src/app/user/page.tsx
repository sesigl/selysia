import WelcomeBanner from "@/app/user/partials/dashboard/WelcomeBanner";
import DashboardAvatars from "@/app/user/partials/dashboard/DashboardAvatars";
import PostSchedule from "@/app/user/partials/dashboard/PostSchedule";
import React from "react";
import PostServerFetcher from "@/lib/infrastructure/client/PostServerFetcher";

export default async function UserDashboard() {
  let posts = await new PostServerFetcher().get();

  return (
    <>
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Avatars */}
        <DashboardAvatars />

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          {/*<FilterButton align="right" />*/}
          {/* Datepicker built with flatpickr */}
          {/*<Datepicker />*/}
          {/* Add view button */}
          {/*<button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add View</span>
                </button>*/}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Line chart (Acme Plus) */}
        <PostSchedule posts={posts} />
        {/*/!* Line chart (Acme Advanced) *!/*/}
        {/*<DashboardCard02 />*/}
        {/*/!* Line chart (Acme Professional) *!/*/}
        {/*<DashboardCard03 />*/}
        {/*/!* Bar chart (Direct vs Indirect) *!/*/}
        {/*<DashboardCard04 />*/}
        {/*/!* Line chart (Real Time Value) *!/*/}
        {/*<DashboardCard05 />*/}
        {/*/!* Doughnut chart (Top Countries) *!/*/}
        {/*<DashboardCard06 />*/}
        {/*/!* Table (Top Channels) *!/*/}
        {/*<DashboardCard07 />*/}
        {/*/!* Line chart (Sales Over Time) *!/*/}
        {/*<DashboardCard08 />*/}
        {/*/!* Stacked bar chart (Sales VS Refunds) *!/*/}
        {/*<DashboardCard09 />*/}
        {/*/!* Card (Recent Activity) *!/*/}
        {/*<DashboardCard10 />*/}
        {/*/!* Card (Income/Expenses) *!/*/}
        {/*<DashboardCard11 />*/}
      </div>
    </>
  );
}
