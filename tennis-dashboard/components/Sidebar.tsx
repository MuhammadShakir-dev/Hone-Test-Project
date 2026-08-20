"use client";

import Image from "next/image";

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  live?: boolean;
  /** the Score PNG is blue; grey it out when inactive */
  blueIcon?: boolean;
  /** monochrome PNGs rendered via CSS mask so they can be tinted blue */
  mask?: boolean;
};

const MENU: MenuItem[] = [
  { id: "all-games", label: "All games", icon: "/assets/icon-all-games.png", mask: true },
  { id: "live-games", label: "Live Games", icon: "/assets/icon-live-games.png", live: true, mask: true },
  { id: "score", label: "Score", icon: "/assets/icon-score.png", blueIcon: true },
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
    <div className="flex h-full min-h-screen w-[300px] flex-col bg-panel">
      {/* Logo */}
      <div className="px-10 pt-10">
        <Image
          src="/assets/logo.png"
          alt="Tennis"
          width={128}
          height={38}
          priority
        />
      </div>

      {/* Menu */}
      <nav className="mt-[58px] flex flex-col gap-[45px] pl-10">
        {MENU.map((item) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelect(item.id);
              }}
              className={`relative flex h-5 items-center gap-[10px] text-[14px] leading-[18px] transition-colors duration-200 ${
                isActive ? "font-medium text-blue" : "text-menu hover:text-ink"
              }`}
            >
              {item.mask ? (
                <span
                  aria-hidden
                  className="h-5 w-5 shrink-0 transition-colors duration-200"
                  style={{
                    backgroundColor: isActive ? "#1757FF" : "#9B9B9B",
                    WebkitMaskImage: `url(${item.icon})`,
                    maskImage: `url(${item.icon})`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              ) : (
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  className={`transition-[filter,opacity] duration-200 ${
                    item.blueIcon && !isActive ? "opacity-60 grayscale" : ""
                  }`}
                />
              )}
              <span>{item.label}</span>
              {item.live && (
                <span className="ml-[10px] flex h-[15px] w-[30px] items-center justify-center rounded-[4px] bg-live text-[8px] font-bold tracking-[0.04em] text-white">
                  LIVE
                </span>
              )}
              {isActive && (
                <span className="absolute -right-[2px] top-1/2 h-[30px] w-[5px] -translate-y-1/2 rounded-full bg-blue" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="mx-[25px] mb-[25px] mt-auto pt-[60px]">
        <div className="group relative rounded-card bg-[#ECEEFE]">
          <Image
            src="/assets/upgrade-lock.png"
            alt=""
            width={215}
            height={215}
            className="absolute -top-[48px] left-1/2 -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-[6px] group-hover:scale-105 group-hover:-rotate-3"
          />
          <div className="px-[45px] pb-0 pt-[173px] text-center text-[12px] leading-[18px] text-[#1B152F]">
            Upgrade to <span className="font-bold text-blue">PRO</span> for
            <br />
            more features.
          </div>
          <div className="p-[10px] pt-[15px]">
            <button className="h-[54px] w-full rounded-[10px] bg-blue text-[12px] font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#0F4BEB] hover:shadow-lg hover:shadow-blue/30 active:scale-[0.98]">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
