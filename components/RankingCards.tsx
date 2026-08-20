import Image from "next/image";
import { DownIcon, UpIcon } from "./icons";

type RankingCard = {
  label: string;
  value: number;
  direction: "up" | "down";
  background: string;
  art: string;
  artWidth: number;
  artHeight: number;
  artClass: string;
};

const CARDS: RankingCard[] = [
  {
    label: "Singles",
    value: 18,
    direction: "up",
    background: "#F44772",
    art: "/assets/rank-singles.png",
    artWidth: 378,
    artHeight: 530,
    artClass: "pointer-events-none absolute -right-10 -top-10 h-[190px] w-auto max-w-none select-none",
  },
  {
    label: "Doubles",
    value: 20,
    direction: "up",
    background: "#FF9A3E",
    art: "/assets/rank-doubles.png",
    artWidth: 366,
    artHeight: 527,
    artClass: "pointer-events-none absolute -right-10 -top-10 h-[190px] w-auto max-w-none select-none",
  },
  {
    label: "Mixed Doubles",
    value: 16,
    direction: "down",
    background: "#332A7D",
    art: "/assets/rank-mixed.png",
    artWidth: 425,
    artHeight: 426,
    artClass: "pointer-events-none absolute -right-8 -top-7 h-[150px] w-auto max-w-none select-none",
  },
];

export default function RankingCards() {
  return (
    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-3">
      {CARDS.map((card) => (
        <article
          key={card.label}
          className="relative h-[100px] overflow-hidden rounded-[20px] shadow-card"
          style={{ backgroundColor: card.background }}
        >
          <Image
            src={card.art}
            alt=""
            width={card.artWidth}
            height={card.artHeight}
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
              {card.direction === "up" ? (
                <UpIcon className="h-6 w-6" />
              ) : (
                <DownIcon className="h-6 w-6" />
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
