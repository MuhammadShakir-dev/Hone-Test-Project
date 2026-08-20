"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { ArrowLeftIcon, CloseIcon, MenuIcon } from "./icons";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("score");

  return (
    <div className="h-screen overflow-hidden bg-page">
      <div className="flex h-full">
        {/* Static sidebar (desktop) */}
        <aside className="hidden h-full shrink-0 xl:block">
          <Sidebar active={activeMenu} onSelect={setActiveMenu} />
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <div
              className="absolute inset-0 bg-night/40 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <div className="drawer-in absolute inset-y-0 left-0 w-[300px] overflow-y-auto shadow-2xl">
              <Sidebar active={activeMenu} onSelect={setActiveMenu} />
              <button
                aria-label="Close menu"
                className="absolute right-4 top-10"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Main */}
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-clip px-4 pb-[25px] sm:px-6 xl:pl-[30px] xl:pr-10">
          {/* Header */}
          <header className="flex items-center justify-between pt-8 xl:pt-[48px]">
            <div className="flex items-center gap-4 xl:gap-5">
              <button
                aria-label="Open menu"
                className="xl:hidden"
                onClick={() => setOpen(true)}
              >
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
              <button aria-label="Search" className="transition-opacity hover:opacity-70">
                <Image src="/assets/icon-search.png" alt="" width={24} height={24} />
              </button>
              <button aria-label="Settings" className="hidden transition-opacity hover:opacity-70 sm:block">
                <Image src="/assets/icon-settings.png" alt="" width={24} height={24} />
              </button>
              <button aria-label="Notifications" className="hidden transition-opacity hover:opacity-70 sm:block">
                <Image src="/assets/icon-notification.png" alt="" width={24} height={24} />
              </button>
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

          {children}
        </div>
      </div>
    </div>
  );
}
