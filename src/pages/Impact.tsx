import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { GrowingTree } from "@/components/impact/GrowingTree";
import { ImpactStats } from "@/components/impact/ImpactStats";
import { Leaderboard } from "@/components/impact/Leaderboard";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

type TabType = "impact" | "leaderboard";

export default function Impact() {
  const [activeTab, setActiveTab] = useState<TabType>("impact");
  const { profile, loading } = useProfile();

  const cupsSaved = profile?.cups_saved_count || 0;

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Eco-Verse</h1>
        <p className="text-sm text-muted-foreground">Dampak positif kontribusi kamu</p>
      </header>

      {/* Tabs */}
      <div className="flex mx-4 mb-6 bg-muted rounded-xl p-1">
        <button
          onClick={() => setActiveTab("impact")}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
            activeTab === "impact"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Dampak Saya
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all",
            activeTab === "leaderboard"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Leaderboard
        </button>
      </div>

      {loading ? (
        <div className="px-4">
          <div className="h-64 bg-muted rounded-3xl animate-pulse mb-6" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 pb-6">
          {activeTab === "impact" ? (
            <div className="stagger-children">
              {/* Growing Tree Visualization */}
              <GrowingTree cupsSaved={cupsSaved} />
              
              {/* Impact Statistics */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Statistik Dampak</h2>
                <ImpactStats cupsSaved={cupsSaved} />
              </div>

              {/* Badges Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Lencana Anda</h2>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {cupsSaved >= 1 && (
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-gold/20 flex items-center justify-center mb-1">
                        <span className="text-2xl">🏅</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">First Cup</p>
                    </div>
                  )}
                  {cupsSaved >= 10 && (
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/30 flex items-center justify-center mb-1">
                        <span className="text-2xl">🌟</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">10 Cups</p>
                    </div>
                  )}
                  {cupsSaved >= 25 && (
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-primary/20 flex items-center justify-center mb-1">
                        <span className="text-2xl">🌳</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Tree Hugger</p>
                    </div>
                  )}
                  {/* Locked badges */}
                  {cupsSaved < 10 && (
                    <div className="flex-shrink-0 w-20 text-center opacity-40">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-muted flex items-center justify-center mb-1">
                        <span className="text-2xl">🔒</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">10 Cups</p>
                    </div>
                  )}
                  {cupsSaved < 50 && (
                    <div className="flex-shrink-0 w-20 text-center opacity-40">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-muted flex items-center justify-center mb-1">
                        <span className="text-2xl">🔒</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Eco Hero</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Top Eco Warriors</h2>
              <Leaderboard currentUserCups={cupsSaved} />
            </div>
          )}
        </div>
      )}
    </MobileLayout>
  );
}