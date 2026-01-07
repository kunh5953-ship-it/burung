import { useState, useEffect } from "react";
import { Coffee, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface ActiveRental {
  id: string;
  borrowed_at: string;
  deposit_amount: number;
  merchant_name?: string;
  merchant_location?: string;
}

export const ActiveRentals = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState<ActiveRental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchActiveRentals = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select(`
          id,
          borrowed_at,
          deposit_amount,
          merchants (name, location_name)
        `)
        .eq("user_id", user.id)
        .eq("status", "borrowed")
        .order("borrowed_at", { ascending: false });

      if (!error && data) {
        const formattedData = data.map((r: any) => ({
          id: r.id,
          borrowed_at: r.borrowed_at,
          deposit_amount: r.deposit_amount,
          merchant_name: r.merchants?.name,
          merchant_location: r.merchants?.location_name,
        }));
        setRentals(formattedData);
      }
      setLoading(false);
    };

    fetchActiveRentals();
  }, [user]);

  if (loading) {
    return (
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Pinjaman Aktif</h2>
        <div className="card-eco animate-pulse">
          <div className="h-20 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  if (rentals.length === 0) {
    return (
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Pinjaman Aktif</h2>
        <div className="card-eco text-center py-8">
          <Coffee className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Belum ada gelas yang dipinjam
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Scan QR di lokasi mitra untuk meminjam
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-6">
      <h2 className="text-lg font-semibold text-foreground mb-3">Pinjaman Aktif</h2>
      <div className="space-y-3">
        {rentals.map((rental) => (
          <div key={rental.id} className="card-eco">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Coffee className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground truncate">
                    {rental.merchant_name || "SIRKEL Cup"}
                  </h3>
                  <span className="badge-eco">Aktif</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{rental.merchant_location || "Lokasi"}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>
                    Dipinjam {formatDistanceToNow(new Date(rental.borrowed_at), { 
                      addSuffix: true, 
                      locale: id 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};