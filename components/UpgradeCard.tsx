import Image from "next/image";

export default function UpgradeCard() {
  return (
    <div className="mx-[25px] mb-4 mt-auto shrink-0 pt-10 xl:mb-[25px] xl:pt-[60px]">
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
  );
}
