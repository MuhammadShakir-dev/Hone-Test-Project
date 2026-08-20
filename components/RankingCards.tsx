import Image from "next/image";
import { DownIcon, UpIcon } from "./icons";

const CARDS = [
  {
    label: "Singles",
    value: 18,
    dir: "up" as const,
    bg: "#F44772",
    art: "/assets/rank-singles.png",
    artW: 378,
    artH: 530,
    artClass: "pointer-events-none absolute -right-10 -top-10 h-[190px] w-auto max-w-none select-none",
  },
  {
    label: "Doubles",
    value: 20,
    dir: "up" as const,
    bg: "#FF9A3E",
    art: "/assets/rank-doubles.png",
    artW: 366,
    artH: 527,
    artClass: "pointer-events-none absolute -right-10 -top-10 h-[190px] w-auto max-w-none select-none",
  },
  {
    label: "Mixed Doubles",
    value: 16,
    dir: "down" as const,
    bg: "#332A7D",
    art: "/assets/rank-mixed.png",
    artW: 425,
    artH: 426,
    artClass: "pointer-events-none absolute -right-8 -top-7 h-[150px] w-auto max-w-none select-none",
  },
];

export default function RankingCards() {
  return (
    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-3">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className="relative h-[100px] overflow-hidden rounded-[20px] shadow-card"
          style={{ backgroundColor: card.bg }}
        >
          <Image
            src={card.art}
            alt=""
            width={card.artW}
            height={card.artH}
            className={card.artClass}
          />

          <div className="relative px-[15px] pt-5">
            <p className="text-[12px] font-medium leading-[18px] text-white">
              {card.label}
            </p>
            <div className="mt-[15px] flex items-center gap-[5px]">
              <span className="text-[20px] font-semibold leading-[30px] text-white">
                {card.value}
              </span>
              {card.dir === "up" ? (
                <UpIcon className="h-6 w-6" />
              ) : (
                <DownIcon className="h-6 w-6" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
