"use client";

import { useState } from "react";
import Header from "./Header";
import MobileDrawer from "./MobileDrawer";
import Sidebar from "./Sidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("score");

  return (
    <div className="h-screen overflow-hidden bg-page">
      <div className="flex h-full">
        <aside className="hidden h-full shrink-0 xl:block">
          <Sidebar active={activeMenu} onSelect={setActiveMenu} />
        </aside>

        {menuOpen && (
          <MobileDrawer
            activeMenu={activeMenu}
            onSelect={setActiveMenu}
            onClose={() => setMenuOpen(false)}
          />
        )}

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-clip px-4 pb-[25px] sm:px-6 xl:pl-[30px] xl:pr-10">
          <Header onOpenMenu={() => setMenuOpen(true)} />
          {children}
        </div>
      </div>
    </div>
  );
}
