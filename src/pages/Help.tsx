import { MobileLayout } from "@/components/layout/MobileLayout";
import { ArrowLeft, Send, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Help() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Pesan kosong",
        description: "Silakan tulis pesan terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Laporan Terkirim! 📨",
      description: "Tim kami akan menghubungi kamu dalam 1x24 jam",
    });

    setMessage("");
    setIsSubmitting(false);
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
        <h1 className="text-lg font-bold text-foreground">Bantuan & Support</h1>
      </header>

      {/* Help Content */}
      <div className="px-4 py-6">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground text-center mb-2">
          Ada yang bisa kami bantu?
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Ceritakan kendala atau pertanyaan kamu, tim kami siap membantu!
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Describe your issue
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Contoh: Saya tidak bisa mengembalikan gelas di lokasi X..."
              className="min-h-[150px] rounded-xl border-border focus:border-primary"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Report
              </>
            )}
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h3 className="font-semibold text-foreground mb-3">FAQ Umum</h3>
          <div className="space-y-2">
            <div className="card-eco">
              <p className="font-medium text-foreground text-sm">
                Bagaimana cara mengembalikan gelas?
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Scan QR Code di Drop Box atau merchant terdekat
              </p>
            </div>
            <div className="card-eco">
              <p className="font-medium text-foreground text-sm">
                Berapa lama batas waktu pinjam?
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Kamu punya waktu 48 jam untuk mengembalikan gelas
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
