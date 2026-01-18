import { MobileLayout } from "@/components/layout/MobileLayout";
import { ArrowLeft, Bell, Moon, KeyRound, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifikasi Aktif" : "Notifikasi Nonaktif",
      description: checked
        ? "Kamu akan menerima notifikasi push"
        : "Notifikasi push dimatikan",
    });
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Dark Mode Aktif" : "Light Mode Aktif",
      description: "Perubahan tema berhasil",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Fitur Coming Soon",
      description: "Ubah password akan tersedia di update berikutnya",
    });
  };

  return (
    <MobileLayout showNav={false}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background px-4 py-4 flex items-center gap-3 border-b border-border">
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Pengaturan</h1>
      </header>

      {/* Settings List */}
      <div className="px-4 py-4 space-y-3">
        {/* Push Notifications */}
        <div className="card-eco flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Push Notifications</p>
              <p className="text-sm text-muted-foreground">
                Terima notifikasi tentang rental
              </p>
            </div>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={handleNotificationsChange}
          />
        </div>

        {/* Dark Mode */}
        <div className="card-eco flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Tema gelap untuk mata
              </p>
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleDarkModeChange} />
        </div>

        {/* Change Password */}
        <button
          onClick={handleChangePassword}
          className="w-full card-eco flex items-center justify-between hover:shadow-eco-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Ubah Password</p>
              <p className="text-sm text-muted-foreground">
                Perbarui kata sandi akun
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </MobileLayout>
  );
}
