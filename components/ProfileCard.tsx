import Image from "next/image";
import { FacebookIcon, FlagIcon, TwitterIcon } from "./icons";

export default function ProfileCard() {
  return (
    <section className="relative h-[505px] overflow-hidden rounded-card bg-white shadow-[0_50px_80px_0_rgba(102,30,255,0.2)]">
      {/* purple header with wavy bottom edge */}
      <svg
        viewBox="0 0 400 192"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-[192px] w-full"
      >
        <defs>
          <linearGradient id="profile-purple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8A4BFE" />
            <stop offset="100%" stopColor="#5E29F9" />
          </linearGradient>
        </defs>
        <path
          d="M0 0H400V141C330 148 260 162 193 172C130 182 60 190 0 181Z"
          fill="url(#profile-purple)"
        />
      </svg>

      <div className="relative">
        <h2 className="px-[25px] pt-10 text-[30px] font-semibold leading-[45px] text-white">
          Anindita
          <br />
          Rahmawati
        </h2>
        <div className="mt-[5px] flex items-center gap-[10px] px-[25px]">
          <FlagIcon className="h-6 w-6" />
          <span className="text-[12px] font-medium leading-[18px] text-white">
            Indonesia
          </span>
        </div>

        <h3 className="mt-[48px] px-[25px] text-[14px] font-semibold leading-[20px] text-night">
          Biography
        </h3>

        <div className="ml-[24px] mt-[8px] h-[60px] w-[50px] overflow-hidden rounded-[10px] bg-gradient-to-b from-[#FDC4DA] to-[#F9A7C8]">
          <Image
            src="/assets/avatar-girl.png"
            alt="Anindita Rahmawati"
            width={50}
            height={60}
            className="h-[60px] w-[50px]"
          />
        </div>

        <div className="mt-[17px] space-y-[10px] px-6 text-[12px] font-medium leading-[16px] text-night">
          <p>Age : 27</p>
          <p>Birth : 24 - 02 - 1993</p>
          <p>Sex : Women</p>
          <p>WTA : 10.</p>
        </div>

        <p className="mt-[27px] px-[25px] text-[12px] font-semibold leading-[16px] text-night">
          Social Media
        </p>
        <div className="mt-[10px] flex items-center gap-[5px] px-[27px]">
          <a href="#" aria-label="Twitter" className="transition-opacity hover:opacity-70">
            <TwitterIcon className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Facebook" className="transition-opacity hover:opacity-70">
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
