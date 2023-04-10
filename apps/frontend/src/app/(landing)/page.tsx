import HeroHome from "@/app/(landing)/partials/HeroHome";
import Process from "@/app/(landing)/partials/Process";
import FeaturesHome from "@/app/(landing)/partials/FeaturesHome";
import Tabs from "@/app/(landing)/partials/Tabs";
import Target from "@/app/(landing)/partials/Target";
import Newsletter from "@/app/(landing)/partials/Newsletter";

export default async function Home() {
  return (
    <>
      {/*  Page sections */}
      <HeroHome />

      <Process />
      <FeaturesHome />
      <Tabs />
      <Target />
      {
        //  <News />
      }
      <Newsletter />
    </>
  );
}
