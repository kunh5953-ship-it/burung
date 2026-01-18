import { MobileLayout } from "@/components/layout/MobileLayout";
import { ArrowLeft, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const rentalHistory = [
  { id: 1, title: "Earth Series Cup", date: "15 Jan 2026", status: "returned" },
  { id: 2, title: "Ocean Series Cup", date: "12 Jan 2026", status: "returned" },
  { id: 3, title: "Forest Series Cup", date: "10 Jan 2026", status: "ongoing" },
  { id: 4, title: "Earth Series Cup", date: "5 Jan 2026", status: "returned" },
  { id: 5, title: "Mountain Series Cup", date: "2 Jan 2026", status: "returned" },
];

export default function History() {
  const navigate = useNavigate();

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
        <h1 className="text-lg font-bold text-foreground">Riwayat Rental</h1>
      </header>

      {/* Rental List */}
      <div className="px-4 py-4 space-y-3">
        {rentalHistory.map((rental) => (
          <div key={rental.id} className="card-eco flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Coffee className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Pinjam - {rental.title}</p>
              <p className="text-sm text-muted-foreground">{rental.date}</p>
            </div>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                rental.status === "returned"
                  ? "bg-primary/10 text-primary"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {rental.status === "returned" ? "Returned" : "Ongoing"}
            </span>
          </div>
        ))}
      </div>

      {/* Empty State if needed */}
      {rentalHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Coffee className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Belum ada riwayat rental
          </p>
        </div>
      )}
    </MobileLayout>
  );
}
