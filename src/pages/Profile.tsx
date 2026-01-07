import { MobileLayout } from "@/components/layout/MobileLayout";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Wallet, 
  Star, 
  Award, 
  History, 
  Users, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Coffee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Sampai jumpa! 👋",
      description: "Anda telah logout",
    });
    navigate("/auth");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case "Gold":
        return "badge-gold";
      case "Silver":
        return "badge-silver";
      default:
        return "badge-eco";
    }
  };

  const menuItems = [
    { icon: <History className="w-5 h-5" />, label: "Riwayat Rental", path: "/history" },
    { icon: <Users className="w-5 h-5" />, label: "Teman & Komunitas", path: "/friends" },
    { icon: <Settings className="w-5 h-5" />, label: "Pengaturan", path: "/settings" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Bantuan & Support", path: "/help" },
  ];

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      {/* Header with Avatar */}
      <header className="px-4 pt-6 pb-4 text-center">
        <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          {profile?.name || "Pengguna"}
        </h1>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={getMembershipBadge(profile?.membership_tier || "Bronze")}>
            <Award className="w-3 h-3" />
            {profile?.membership_tier || "Bronze"} Member
          </span>
        </div>
      </header>

      {/* Stats Row */}
      <div className="flex gap-4 px-4 mb-6">
        <div className="flex-1 card-eco text-center">
          <Coffee className="w-6 h-6 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{profile?.cups_saved_count || 0}</p>
          <p className="text-[10px] text-muted-foreground">Gelas Saved</p>
        </div>
        <div className="flex-1 card-eco text-center">
          <Star className="w-6 h-6 text-gold mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{profile?.green_points || 0}</p>
          <p className="text-[10px] text-muted-foreground">Sirkel Points</p>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="px-4 mb-6">
        <div className="card-forest">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-6 h-6 text-white" />
            <div>
              <p className="text-white/70 text-xs">Saldo Wallet</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(profile?.balance || 0)}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-2 text-white text-sm font-medium">
              Top Up
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-2 text-white text-sm font-medium">
              Tarik
            </button>
          </div>
        </div>
      </div>

      {/* Points Progress */}
      <div className="px-4 mb-6">
        <div className="card-eco">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" />
              <span className="font-medium text-foreground">Sirkel Points</span>
            </div>
            <span className="badge-eco">{profile?.green_points || 0} pts</span>
          </div>
          <div className="progress-eco mb-2">
            <div 
              className="progress-eco-fill"
              style={{ width: `${Math.min(((profile?.green_points || 0) / 500) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.max(500 - (profile?.green_points || 0), 0)} poin lagi untuk Free Coffee ☕
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-2 mb-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-4 p-4 card-eco hover:shadow-eco-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary">
              {item.icon}
            </div>
            <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="w-full h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </MobileLayout>
  );
}