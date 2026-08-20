import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import NextMatchCard from "@/components/NextMatchCard";
import StatisticYearCard from "@/components/StatisticYearCard";
import GlobalStatisticCard from "@/components/GlobalStatisticCard";
import RankingCards from "@/components/RankingCards";
import ProfileCard from "@/components/ProfileCard";
import LiveScoresCard from "@/components/LiveScoresCard";

export default function Home() {
  return (
    <DashboardShell>
      <main className="mt-[25px] grid grid-cols-1 gap-5 xl:mt-[41px] xl:grid-cols-[minmax(0,65fr)_minmax(0,40fr)]">
        {/* Left column */}
        <div className="min-w-0">
          <NextMatchCard />

          <h2 className="mt-[25px] text-[20px] font-semibold leading-[30px] text-ink">
            Statistic
          </h2>
          <div className="mt-[27px] grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,30fr)_minmax(0,33fr)]">
            <StatisticYearCard />
            <GlobalStatisticCard />
          </div>

          <h2 className="mt-[25px] text-[20px] font-semibold leading-[30px] text-ink">
            Rankings
          </h2>
          <div className="mt-[21px]">
            <RankingCards />
          </div>
        </div>

        {/* Right column */}
        <div className="grid min-w-0 grid-cols-1 content-start gap-[22px] md:grid-cols-2 xl:grid-cols-1">
          <div className="relative">
            <ProfileCard />
            <Image
              src="/assets/player-illustration.png"
              alt=""
              width={341}
              height={537}
              priority
              className="pointer-events-none absolute -top-[10px] right-[-15px] z-10 h-[450px] w-auto max-w-none xl:-top-[30px] xl:left-[95px] xl:right-auto xl:h-[540px]"
            />
          </div>
          <LiveScoresCard />
        </div>
      </main>
    </DashboardShell>
  );
}
