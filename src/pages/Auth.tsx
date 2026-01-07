import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Gagal",
            description: error.message === "Invalid login credentials" 
              ? "Email atau password salah" 
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Selamat datang! 🌿",
            description: "Login berhasil",
          });
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Akun Sudah Ada",
              description: "Email ini sudah terdaftar. Silakan login.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Registrasi Gagal",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Selamat bergabung! 🌱",
            description: "Akun berhasil dibuat",
          });
          navigate("/");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-8 animate-bounce-in">
          <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-eco-lg">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">SIRKEL</h1>
        <p className="text-muted-foreground text-center mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
          Satu Gelas, Satu Sirkel
        </p>

        {/* Form Card */}
        <div className="w-full max-w-sm card-eco animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex mb-6 bg-muted rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isLogin 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                !isLogin 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nama
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pl-10 h-12 rounded-xl border-border"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 btn-forest text-base"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Masuk" : "Daftar"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Bottom decorative text */}
        <p className="mt-8 text-xs text-muted-foreground text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          Bergabung dengan gerakan zero-waste bersama SIRKEL 🌿
        </p>
      </div>
    </div>
  );
}