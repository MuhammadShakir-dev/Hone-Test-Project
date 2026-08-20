import Sidebar from "./Sidebar";
import { CloseIcon } from "./icons";

export default function MobileDrawer({
  activeMenu,
  onSelect,
  onClose,
}: {
  activeMenu: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <div
        className="absolute inset-0 bg-night/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="drawer-in absolute inset-y-0 left-0 w-[300px] overflow-y-auto shadow-2xl">
        <Sidebar active={activeMenu} onSelect={onSelect} />
        <button aria-label="Close menu" className="absolute right-4 top-10" onClick={onClose}>
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
