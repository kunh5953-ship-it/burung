import { MobileLayout } from "@/components/layout/MobileLayout";
import { ArrowLeft, Clock, Star, Info, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotificationItem {
  id: string;
  icon: "clock" | "star" | "info" | "leaf";
  iconColor: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    icon: "clock",
    iconColor: "text-orange-500",
    title: "Pengingat Pengembalian",
    description: "Jangan lupa kembalikan 'Earth Series Cup' Anda sebelum pukul 18:00 hari ini untuk menghindari denda.",
    time: "1 jam yang lalu",
    unread: true,
  },
  {
    id: "2",
    icon: "star",
    iconColor: "text-primary",
    title: "+50 Poin Diterima!",
    description: "Terima kasih telah mengembalikan gelas tepat waktu di Kopi Kenangan.",
    time: "Kemarin",
  },
  {
    id: "3",
    icon: "leaf",
    iconColor: "text-secondary",
    title: "Tantangan Selesai!",
    description: "Selamat! Kamu telah menyelesaikan tantangan 'Pemula Hijau' dan mendapatkan 100 Green Points.",
    time: "2 hari yang lalu",
  },
  {
    id: "4",
    icon: "info",
    iconColor: "text-blue-500",
    title: "Update Eco-Verse",
    description: "Fitur baru telah hadir! Cek pertumbuhan hutan virtualmu sekarang.",
    time: "2 hari yang lalu",
  },
];

const iconMap = {
  clock: Clock,
  star: Star,
  info: Info,
  leaf: Leaf,
};

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNav={false}>
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Notifikasi</h1>
        </div>
      </header>

      {/* Notifications List */}
      <div className="px-4 pb-6 space-y-3">
        {notifications.map((notification) => {
          const IconComponent = iconMap[notification.icon];
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-2xl border transition-all ${
                notification.unread
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.unread ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <IconComponent className={`w-5 h-5 ${notification.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground text-sm">
                      {notification.title}
                    </h3>
                    {notification.unread && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Belum ada notifikasi</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
