import { DownIcon, UpIcon } from "./icons";

const CARDS = [
  { label: "Singles", value: 18, dir: "up" as const, bg: "#F44772" },
  { label: "Doubles", value: 20, dir: "up" as const, bg: "#FF9A3E" },
  { label: "Mixed Doubles", value: 16, dir: "down" as const, bg: "#332A7D" },
];

export default function RankingCards() {
  return (
    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-3">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className="relative h-[100px] overflow-hidden rounded-card shadow-card"
          style={{ backgroundColor: card.bg }}
        >
          {/* decorative circles */}
          <span className="absolute -top-[50px] right-[-15px] h-[130px] w-[130px] rounded-full bg-white/[0.22]" />
          <span className="absolute -bottom-[60px] right-[-25px] h-[130px] w-[130px] rounded-full bg-white/[0.20]" />
          <span className="absolute -bottom-[35px] left-[45px] h-[110px] w-[110px] rounded-full border border-white/30" />

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
