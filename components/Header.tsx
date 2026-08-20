import Image from "next/image";
import { ArrowLeftIcon, MenuIcon } from "./icons";

const ACTIONS = [
  { label: "Search", src: "/assets/icon-search.png", hideBelow: null },
  { label: "Settings", src: "/assets/icon-settings.png", hideBelow: "sm" },
  { label: "Notifications", src: "/assets/icon-notification.png", hideBelow: "sm" },
] as const;

export default function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="flex items-center justify-between pt-8 xl:pt-[48px]">
      <div className="flex items-center gap-4 xl:gap-5">
        <button aria-label="Open menu" className="xl:hidden" onClick={onOpenMenu}>
          <MenuIcon className="h-6 w-6" />
        </button>
        <button aria-label="Back" className="hidden sm:block">
          <ArrowLeftIcon className="h-[30px] w-[30px]" />
        </button>
        <h1 className="text-[24px] font-semibold leading-[36px] text-ink xl:text-[30px]">
          Live Scores
        </h1>
      </div>

      <div className="flex items-center gap-5">
        {ACTIONS.map((action) => (
          <button
            key={action.label}
            aria-label={action.label}
            className={`transition-opacity hover:opacity-70 ${
              action.hideBelow === "sm" ? "hidden sm:block" : ""
            }`}
          >
            <Image src={action.src} alt="" width={24} height={24} />
          </button>
        ))}
        <button aria-label="Profile">
          <Image
            src="/assets/avatar-user.png"
            alt="Profile"
            width={30}
            height={30}
            className="rounded-[10px]"
          />
        </button>
      </div>
    </header>
  );
}
