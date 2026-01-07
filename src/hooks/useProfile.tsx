import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Profile {
  id: string;
  email: string | null;
  name: string;
  green_points: number;
  cups_saved_count: number;
  balance: number;
  membership_tier: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateBalance = async (amount: number) => {
    if (!user || !profile) return;

    const newBalance = profile.balance + amount;
    
    const { error } = await supabase
      .from("profiles")
      .update({ balance: newBalance })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memperbarui saldo",
        variant: "destructive",
      });
      return false;
    }

    setProfile({ ...profile, balance: newBalance });
    return true;
  };

  const addPoints = async (points: number) => {
    if (!user || !profile) return;

    const newPoints = profile.green_points + points;
    const newCupsSaved = profile.cups_saved_count + 1;
    
    const { error } = await supabase
      .from("profiles")
      .update({ 
        green_points: newPoints,
        cups_saved_count: newCupsSaved 
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal memperbarui poin",
        variant: "destructive",
      });
      return false;
    }

    setProfile({ ...profile, green_points: newPoints, cups_saved_count: newCupsSaved });
    return true;
  };

  const refetchProfile = () => {
    fetchProfile();
  };

  return { profile, loading, updateBalance, addPoints, refetchProfile };
};