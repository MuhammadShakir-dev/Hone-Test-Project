"use client";

import Image from "next/image";
import SidebarNavItem, { type NavItem } from "./SidebarNavItem";
import UpgradeCard from "./UpgradeCard";

const MENU: NavItem[] = [
  { id: "all-games", label: "All games", icon: "/assets/icon-all-games.png", mask: true },
  { id: "live-games", label: "Live Games", icon: "/assets/icon-live-games.png", live: true, mask: true },
  { id: "score", label: "Score", icon: "/assets/icon-score.png", coloredIcon: true },
  { id: "categories", label: "Categories", icon: "/assets/icon-categories.png", mask: true },
  { id: "video", label: "Video", icon: "/assets/icon-video.png", mask: true },
  { id: "statistic", label: "Statistic", icon: "/assets/icon-statistic.png", mask: true },
];

export default function Sidebar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex h-full min-h-full w-[300px] flex-col overflow-hidden bg-panel">
      <div className="px-10 pt-10">
        <Image src="/assets/logo.png" alt="Tennis" width={128} height={38} priority />
      </div>

      <nav className="mt-8 flex min-h-0 flex-1 flex-col justify-center gap-7 pl-10 xl:mt-[58px] xl:justify-start xl:gap-[45px]">
        {MENU.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            active={item.id === active}
            onSelect={onSelect}
          />
        ))}
      </nav>

      <UpgradeCard />
    </div>
  );
}
