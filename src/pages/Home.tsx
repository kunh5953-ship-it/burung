import { MobileLayout } from "@/components/layout/MobileLayout";
import { WalletCard } from "@/components/home/WalletCard";
import { EcoVersePreview } from "@/components/home/EcoVersePreview";
import { ActiveRentals } from "@/components/home/ActiveRentals";
import { Challenges } from "@/components/home/Challenges";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Bell, Leaf } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const { profile, loading } = useProfile();

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selamat datang,</p>
              <h1 className="font-semibold text-foreground">
                {loading ? "..." : profile?.name || "Pengguna"}
              </h1>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-destructive rounded-full border-2 border-background" />
          </button>
        </div>
      </header>

      {/* Wallet Card */}
      <WalletCard profile={profile} />

      {/* Eco-Verse Preview */}
      <div className="mt-6">
        <EcoVersePreview cupsSaved={profile?.cups_saved_count || 0} />
      </div>

      {/* Active Rentals */}
      <ActiveRentals />

      {/* Challenges */}
      <Challenges />
    </MobileLayout>
  );
}