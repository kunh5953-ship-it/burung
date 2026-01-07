import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  cups: number;
  isCurrentUser?: boolean;
}

// Dummy leaderboard data
const dummyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Wijaya", cups: 52 },
  { rank: 2, name: "Andi Pratama", cups: 48 },
  { rank: 3, name: "Dinda Ayu", cups: 45 },
  { rank: 4, name: "Rizky Fadillah", cups: 42 },
  { rank: 5, name: "Maya Sari", cups: 38 },
  { rank: 6, name: "Budi Santoso", cups: 35 },
  { rank: 7, name: "Putri Rahayu", cups: 32 },
  { rank: 8, name: "Kevin Tanujaya", cups: 28 },
  { rank: 9, name: "Lisa Permata", cups: 25 },
  { rank: 10, name: "Ahmad Fauzan", cups: 22 },
];

interface LeaderboardProps {
  currentUserCups: number;
}

export const Leaderboard = ({ currentUserCups }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-gold" />;
      case 2:
        return <Medal className="w-5 h-5 text-silver" />;
      case 3:
        return <Award className="w-5 h-5 text-bronze" />;
      default:
        return <span className="text-sm font-semibold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gold/10 border-gold/30";
      case 2:
        return "bg-silver/10 border-silver/30";
      case 3:
        return "bg-bronze/10 border-bronze/30";
      default:
        return "bg-card";
    }
  };

  // Find user's position
  const userRank = dummyLeaderboard.findIndex((entry) => entry.cups <= currentUserCups);
  const displayRank = userRank === -1 ? dummyLeaderboard.length + 1 : userRank + 1;

  return (
    <div className="space-y-2">
      {dummyLeaderboard.slice(0, 5).map((entry) => (
        <div
          key={entry.rank}
          className={`flex items-center gap-3 p-3 rounded-xl border ${getRankBg(entry.rank)}`}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            {getRankIcon(entry.rank)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{entry.name}</p>
          </div>
          <div className="text-right">
            <span className="font-semibold text-foreground">{entry.cups}</span>
            <span className="text-xs text-muted-foreground ml-1">gelas</span>
          </div>
        </div>
      ))}

      {/* Current User */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dashed border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">Posisi Anda</span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-accent border-2 border-primary">
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{displayRank}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground">Anda</p>
        </div>
        <div className="text-right">
          <span className="font-bold text-primary">{currentUserCups}</span>
          <span className="text-xs text-muted-foreground ml-1">gelas</span>
        </div>
      </div>
    </div>
  );
};