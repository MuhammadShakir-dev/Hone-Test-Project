import Image from "next/image";

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  live?: boolean;
  /** Score PNG is already blue; grey it out when the item is not active. */
  coloredIcon?: boolean;
  /** Monochrome PNG tinted via CSS mask so it can turn blue when active. */
  mask?: boolean;
};

export default function SidebarNavItem({
  item,
  active,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        onSelect(item.id);
      }}
      className={`relative flex h-5 items-center gap-[10px] text-[14px] leading-[18px] transition-colors duration-200 ${
        active ? "font-medium text-blue" : "text-menu hover:text-ink"
      }`}
    >
      <NavIcon item={item} active={active} />
      <span>{item.label}</span>
      {item.live && (
        <span className="ml-[10px] flex h-[15px] w-[30px] items-center justify-center rounded-[4px] bg-live text-[8px] font-bold tracking-[0.04em] text-white">
          LIVE
        </span>
      )}
      {active && (
        <span className="absolute -right-[2px] top-1/2 h-[30px] w-[5px] -translate-y-1/2 rounded-full bg-blue" />
      )}
    </a>
  );
}

function NavIcon({ item, active }: { item: NavItem; active: boolean }) {
  if (item.mask) {
    return (
      <span
        aria-hidden
        className="h-5 w-5 shrink-0 transition-colors duration-200"
        style={{
          backgroundColor: active ? "#1757FF" : "#9B9B9B",
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
    );
  }

  return (
    <Image
      src={item.icon}
      alt=""
      width={20}
      height={20}
      className={`transition-[filter,opacity] duration-200 ${
        item.coloredIcon && !active ? "opacity-60 grayscale" : ""
      }`}
    />
  );
}
