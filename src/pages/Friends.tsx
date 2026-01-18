import { MobileLayout } from "@/components/layout/MobileLayout";
import { ArrowLeft, Trophy, Users, Leaf, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const topFriends = [
  { id: 1, name: "Andi Pratama", points: 2450, rank: 1, avatar: "A" },
  { id: 2, name: "Siti Nurhaliza", points: 2120, rank: 2, avatar: "S" },
  { id: 3, name: "Budi Santoso", points: 1890, rank: 3, avatar: "B" },
];

const greenStories = [
  {
    id: 1,
    user: "Budi",
    avatar: "B",
    action: "just saved 5 cups!",
    time: "2 jam lalu",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    user: "Maya",
    avatar: "M",
    action: "completed the 7-Day Streak Challenge! 🎉",
    time: "5 jam lalu",
    likes: 24,
    comments: 8,
  },
];

export default function Friends() {
  const navigate = useNavigate();

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
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
        <h1 className="text-lg font-bold text-foreground">Teman & Komunitas</h1>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mx-4 mt-4" style={{ width: "calc(100% - 32px)" }}>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="stories" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Green Stories
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="px-4 py-4 space-y-3">
          <p className="text-sm text-muted-foreground mb-4">Top 3 Teman Kamu</p>
          {topFriends.map((friend) => (
            <div key={friend.id} className="card-eco flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankStyle(
                  friend.rank
                )}`}
              >
                {friend.rank}
              </div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {friend.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{friend.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Leaf className="w-4 h-4 text-primary" />
                  <span>{friend.points.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Green Stories Tab */}
        <TabsContent value="stories" className="px-4 py-4 space-y-4">
          {greenStories.map((story) => (
            <div key={story.id} className="card-eco">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {story.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-foreground">
                    <span className="font-bold">{story.user}</span> {story.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{story.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{story.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{story.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </MobileLayout>
  );
}
