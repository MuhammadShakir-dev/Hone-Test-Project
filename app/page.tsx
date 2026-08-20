import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import GlobalStatisticCard from "@/components/GlobalStatisticCard";
import LiveScoresCard from "@/components/LiveScoresCard";
import NextMatchCard from "@/components/NextMatchCard";
import ProfileCard from "@/components/ProfileCard";
import RankingCards from "@/components/RankingCards";
import SectionTitle from "@/components/SectionTitle";
import StatisticYearCard from "@/components/StatisticYearCard";

export default function Home() {
  return (
    <DashboardShell>
      <main className="mt-[25px] grid grid-cols-1 gap-5 xl:mt-[41px] xl:grid-cols-[minmax(0,65fr)_minmax(0,40fr)]">
        <div className="min-w-0">
          <NextMatchCard />

          <SectionTitle className="mt-[25px]">Statistic</SectionTitle>
          <div className="mt-[27px] grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,30fr)_minmax(0,33fr)]">
            <StatisticYearCard />
            <GlobalStatisticCard />
          </div>

          <SectionTitle className="mt-[25px]">Rankings</SectionTitle>
          <div className="mt-[21px]">
            <RankingCards />
          </div>
        </div>

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
