import { useState, useEffect } from "react";
import { Flame, Trophy, Target, Users, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Challenge {
  id: string;
  title: string;
  description: string;
  target_cups: number;
  reward_points: number;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  flame: <Flame className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  shield: <Target className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  star: <Trophy className="w-5 h-5" />,
};

export const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .limit(3);

      if (!error && data) {
        setChallenges(data);
      }
      setLoading(false);
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <div className="px-4 mt-6 pb-4">
        <h2 className="text-lg font-semibold text-foreground mb-3">Tantangan Aktif</h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="card-eco animate-pulse">
              <div className="h-16 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-6 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">Tantangan Aktif</h2>
        <button className="text-sm text-primary font-medium flex items-center gap-1">
          Lihat Semua
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="card-eco hover:shadow-eco-md transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary">
                {iconMap[challenge.icon] || <Trophy className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {challenge.description}
                </p>
              </div>
              <div className="text-right">
                <span className="badge-eco">+{challenge.reward_points}</span>
                <p className="text-xs text-muted-foreground mt-1">poin</p>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>0/{challenge.target_cups}</span>
              </div>
              <div className="progress-eco">
                <div className="progress-eco-fill" style={{ width: "0%" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};