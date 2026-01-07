import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { QrCode, ScanLine, CheckCircle, AlertCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ScanResult = "success" | "error" | null;

export default function Scan() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult>(null);
  const [scanType, setScanType] = useState<"borrow" | "return" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user } = useAuth();
  const { profile, updateBalance, addPoints, refetchProfile } = useProfile();
  const { toast } = useToast();

  const DEPOSIT_AMOUNT = 20000;
  const RETURN_POINTS = 10;

  const handleBorrow = async () => {
    if (!user || !profile) return;
    
    if (profile.balance < DEPOSIT_AMOUNT) {
      toast({
        title: "Saldo Tidak Cukup",
        description: `Saldo minimal Rp ${DEPOSIT_AMOUNT.toLocaleString("id-ID")} untuk meminjam`,
        variant: "destructive",
      });
      setScanResult("error");
      return;
    }

    setIsProcessing(true);
    
    // Deduct balance
    const balanceUpdated = await updateBalance(-DEPOSIT_AMOUNT);
    
    if (balanceUpdated) {
      // Create transaction record
      const { error } = await supabase.from("transactions").insert({
        user_id: user.id,
        status: "borrowed",
        deposit_amount: DEPOSIT_AMOUNT,
      });

      if (error) {
        console.error("Transaction error:", error);
        await updateBalance(DEPOSIT_AMOUNT); // Refund
        setScanResult("error");
        toast({
          title: "Gagal",
          description: "Terjadi kesalahan saat meminjam",
          variant: "destructive",
        });
      } else {
        setScanResult("success");
        toast({
          title: "Berhasil! 🎉",
          description: `Gelas dipinjam. Deposit: Rp ${DEPOSIT_AMOUNT.toLocaleString("id-ID")}`,
        });
      }
    } else {
      setScanResult("error");
    }
    
    setIsProcessing(false);
    refetchProfile();
  };

  const handleReturn = async () => {
    if (!user || !profile) return;
    
    setIsProcessing(true);

    // Find active rental
    const { data: activeRental } = await supabase
      .from("transactions")
      .select("id, deposit_amount")
      .eq("user_id", user.id)
      .eq("status", "borrowed")
      .limit(1)
      .single();

    if (!activeRental) {
      toast({
        title: "Tidak Ada Pinjaman",
        description: "Anda tidak memiliki gelas yang dipinjam",
        variant: "destructive",
      });
      setScanResult("error");
      setIsProcessing(false);
      return;
    }

    // Refund deposit
    await updateBalance(activeRental.deposit_amount);
    
    // Add points
    await addPoints(RETURN_POINTS);

    // Update transaction
    const { error } = await supabase
      .from("transactions")
      .update({
        status: "returned",
        returned_at: new Date().toISOString(),
        points_earned: RETURN_POINTS,
      })
      .eq("id", activeRental.id);

    if (error) {
      console.error("Return error:", error);
      setScanResult("error");
    } else {
      setScanResult("success");
      toast({
        title: "Terima Kasih! 🌿",
        description: `+${RETURN_POINTS} poin & deposit dikembalikan`,
      });
    }

    setIsProcessing(false);
    refetchProfile();
  };

  const startScan = (type: "borrow" | "return") => {
    setScanType(type);
    setIsScanning(true);
    setScanResult(null);
  };

  const closeScan = () => {
    setIsScanning(false);
    setScanResult(null);
    setScanType(null);
  };

  const simulateScan = async () => {
    if (scanType === "borrow") {
      await handleBorrow();
    } else {
      await handleReturn();
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        {/* Main Scan Button Area */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Scan QR Code</h1>
          <p className="text-muted-foreground text-sm">
            Scan kode QR di gelas atau mesin untuk meminjam/mengembalikan
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-xs space-y-4">
          <Button
            onClick={() => startScan("borrow")}
            className="w-full h-14 btn-forest text-base"
          >
            <ArrowDownLeft className="w-5 h-5 mr-2" />
            Pinjam Gelas
          </Button>
          
          <Button
            onClick={() => startScan("return")}
            variant="outline"
            className="w-full h-14 rounded-xl text-base border-2 border-primary text-primary hover:bg-accent"
          >
            <ArrowUpRight className="w-5 h-5 mr-2" />
            Kembalikan Gelas
          </Button>
        </div>

        {/* Info */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            Deposit: Rp 20.000 • Dikembalikan saat return
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            +10 poin setiap pengembalian berhasil
          </p>
        </div>
      </div>

      {/* Scan Modal */}
      <Dialog open={isScanning} onOpenChange={closeScan}>
        <DialogContent className="max-w-sm mx-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              {scanType === "borrow" ? "Pinjam Gelas" : "Kembalikan Gelas"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-6">
            {scanResult === null && (
              <>
                {/* Simulated Scanner */}
                <div className="relative w-48 h-48 border-2 border-dashed border-primary rounded-2xl flex items-center justify-center bg-muted/50 mb-6">
                  <ScanLine className="w-full h-8 text-primary/50 absolute animate-pulse" />
                  <QrCode className="w-20 h-20 text-muted-foreground/30" />
                </div>
                
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Arahkan kamera ke kode QR pada gelas
                </p>

                <Button
                  onClick={simulateScan}
                  disabled={isProcessing}
                  className="btn-forest"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Simulasi Scan {scanType === "borrow" ? "Pinjam" : "Kembali"}
                    </>
                  )}
                </Button>
              </>
            )}

            {scanResult === "success" && (
              <div className="text-center animate-bounce-in">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {scanType === "borrow" ? "Gelas Dipinjam!" : "Gelas Dikembalikan!"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {scanType === "borrow"
                    ? "Deposit berhasil dikurangi"
                    : "Deposit dikembalikan & +10 poin"}
                </p>
                <Button onClick={closeScan} className="btn-forest">
                  Selesai
                </Button>
              </div>
            )}

            {scanResult === "error" && (
              <div className="text-center animate-bounce-in">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-10 h-10 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Gagal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Terjadi kesalahan. Silakan coba lagi.
                </p>
                <Button onClick={() => setScanResult(null)} variant="outline">
                  Coba Lagi
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}