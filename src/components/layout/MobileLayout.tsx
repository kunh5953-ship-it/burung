import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export const MobileLayout = ({ children, showNav = true }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <main className={showNav ? "flex-1 pb-24 overflow-y-auto" : "flex-1 overflow-y-auto"}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};