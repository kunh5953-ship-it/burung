import { Wallet, Star, ChevronRight } from "lucide-react";
import { Profile } from "@/hooks/useProfile";

interface WalletCardProps {
  profile: Profile | null;
}

export const WalletCard = ({ profile }: WalletCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="card-forest mx-4 mt-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white/70 text-sm mb-1">Saldo Anda</p>
          <h2 className="text-2xl font-bold text-white">
            {profile ? formatCurrency(profile.balance) : "Rp 0"}
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5">
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span className="text-white font-semibold text-sm">
            {profile?.green_points || 0} pts
          </span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2">
          <Wallet className="w-4 h-4" />
          Top Up
        </button>
        <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2">
          Riwayat
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};