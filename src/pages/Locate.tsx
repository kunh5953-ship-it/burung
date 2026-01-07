import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Search, MapPin, Coffee, Package, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

interface Merchant {
  id: string;
  name: string;
  location_name: string;
  type: string;
  status: string;
  cups_available: number;
}

export default function Locate() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchants = async () => {
      const { data, error } = await supabase
        .from("merchants")
        .select("*")
        .order("name");

      if (!error && data) {
        setMerchants(data);
      }
      setLoading(false);
    };

    fetchMerchants();
  }, []);

  const filteredMerchants = merchants.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground mb-4">Temukan Lokasi</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari cafe atau drop point..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-border"
          />
        </div>
      </header>

      {/* Static Map Placeholder */}
      <div className="mx-4 mb-4 relative rounded-2xl overflow-hidden bg-muted h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2 animate-bounce" />
            <p className="text-sm text-muted-foreground">Peta Interaktif</p>
            <p className="text-xs text-muted-foreground">Coming Soon</p>
          </div>
        </div>
        
        {/* Simulated pins */}
        <div className="absolute top-8 left-12 w-6 h-6 rounded-full bg-primary shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
        </div>
        <div className="absolute top-16 right-16 w-6 h-6 rounded-full bg-destructive shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-destructive-foreground" />
        </div>
        <div className="absolute bottom-12 left-1/3 w-6 h-6 rounded-full bg-primary shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
        </div>
        <div className="absolute bottom-20 right-1/4 w-6 h-6 rounded-full bg-primary shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="status-available" />
          <span className="text-xs text-muted-foreground">Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-full" />
          <span className="text-xs text-muted-foreground">Penuh</span>
        </div>
      </div>

      {/* Merchant List */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold text-foreground mb-3">Lokasi Terdekat</h2>
        
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-eco animate-pulse">
                <div className="h-20 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                className="card-eco hover:shadow-eco-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    {merchant.type === "Cafe" ? (
                      <Coffee className="w-6 h-6 text-primary" />
                    ) : (
                      <Package className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-medium text-foreground truncate">
                        {merchant.name}
                      </h3>
                      <span
                        className={
                          merchant.status === "Available"
                            ? "status-available"
                            : "status-full"
                        }
                      />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{merchant.location_name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge-eco text-[10px]">{merchant.type}</span>
                      <span className="text-xs text-muted-foreground">
                        {merchant.cups_available} gelas tersedia
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}