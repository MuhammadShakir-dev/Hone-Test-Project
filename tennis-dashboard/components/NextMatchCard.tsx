import Image from "next/image";
import { CalendarIcon, DivideIcon } from "./icons";

export default function NextMatchCard() {
  return (
    <section className="relative h-[200px] rounded-card bg-white shadow-card">
      <h2 className="absolute left-5 top-5 text-[16px] font-semibold leading-6 text-ink">
        Your Next Match
      </h2>
      <div className="absolute right-[25px] top-5 flex items-center gap-[10px]">
        <span className="text-[12px] leading-[16px] text-faint">
          18 January 2020
        </span>
        <CalendarIcon className="h-[15px] w-[15px]" />
      </div>

      <div className="flex h-full items-center justify-center gap-[16px] px-6 pt-8 sm:gap-[18px]">
        <div className="mr-[6px] hidden min-w-0 sm:block md:mr-[26px]">
          <p className="truncate text-[17px] font-semibold leading-[30px] text-night md:text-[20px]">
            Naomi O.
          </p>
          <p className="mt-[5px] text-[12px] leading-4 text-faint">Japan</p>
        </div>

        <Image
          src="/assets/avatar-naomi.png"
          alt="Naomi O."
          width={85}
          height={100}
          className="h-[100px] w-[85px] shrink-0 rounded-card object-cover"
        />

        <DivideIcon className="h-[35px] w-[35px] shrink-0" />

        <div className="relative h-[100px] w-[85px] shrink-0 overflow-hidden rounded-card bg-[#FFE7C3]">
          <Image
            src="/assets/avatar-girl.png"
            alt="Anindita R."
            width={85}
            height={100}
            className="h-[100px] w-[85px]"
          />
        </div>

        <div className="ml-[6px] hidden min-w-0 sm:block md:ml-[26px]">
          <p className="truncate text-[17px] font-semibold leading-[30px] text-night md:text-[20px]">
            Anindita R.
          </p>
          <p className="mt-[5px] text-[12px] leading-4 text-faint">Indonesia</p>
        </div>
      </div>

      {/* Names below avatars on very small screens */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-16 sm:hidden">
        <span className="text-[11px] font-semibold text-night">Naomi O.</span>
        <span className="text-[11px] font-semibold text-night">Anindita R.</span>
      </div>
    </section>
  );
}
