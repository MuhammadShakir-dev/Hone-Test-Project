import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { CalendarIcon, DivideIcon } from "./icons";

const MATCH = {
  date: "18 January 2020",
  left: {
    name: "Naomi O.",
    country: "Japan",
    avatar: "/assets/avatar-naomi.png",
  },
  right: {
    name: "Anindita R.",
    country: "Indonesia",
    avatar: "/assets/avatar-girl.png",
  },
};

export default function NextMatchCard() {
  return (
    <section className="relative h-[200px] rounded-card bg-white shadow-card">
      <SectionTitle className="absolute left-5 top-5">Your Next Match</SectionTitle>
      <div className="absolute right-[25px] top-5 flex items-center gap-[10px]">
        <span className="text-[12px] leading-[16px] text-faint">{MATCH.date}</span>
        <CalendarIcon className="h-[15px] w-[15px]" />
      </div>

      <div className="flex h-full items-center justify-center gap-[16px] px-6 pt-8 sm:gap-[18px]">
        <PlayerName name={MATCH.left.name} country={MATCH.left.country} align="left" />
        <Image
          src={MATCH.left.avatar}
          alt={MATCH.left.name}
          width={85}
          height={100}
          className="h-[100px] w-[85px] shrink-0 rounded-[15px_5px_15px_5px] object-cover"
        />
        <DivideIcon className="h-[35px] w-[35px] shrink-0" />
        <div className="relative h-[100px] w-[85px] shrink-0 overflow-hidden rounded-[15px_5px_15px_5px] bg-[#FFE7C3]">
          <Image
            src={MATCH.right.avatar}
            alt={MATCH.right.name}
            width={85}
            height={100}
            className="h-[100px] w-[85px]"
          />
        </div>
        <PlayerName name={MATCH.right.name} country={MATCH.right.country} align="right" />
      </div>

      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-16 sm:hidden">
        <span className="text-[11px] font-semibold text-night">{MATCH.left.name}</span>
        <span className="text-[11px] font-semibold text-night">{MATCH.right.name}</span>
      </div>
    </section>
  );
}

function PlayerName({
  name,
  country,
  align,
}: {
  name: string;
  country: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`hidden min-w-0 sm:block ${
        align === "left" ? "mr-[6px] md:mr-[26px]" : "ml-[6px] md:ml-[26px]"
      }`}
    >
      <p className="truncate text-[25px] font-semibold leading-[30px] text-night">{name}</p>
      <p className="mt-[5px] text-[12px] leading-4 text-faint">{country}</p>
    </div>
  );
}
