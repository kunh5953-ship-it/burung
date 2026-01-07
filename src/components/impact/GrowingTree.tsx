import { TreeDeciduous, TreePine, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface GrowingTreeProps {
  cupsSaved: number;
}

export const GrowingTree = ({ cupsSaved }: GrowingTreeProps) => {
  // Calculate tree growth based on cups saved
  const level = Math.floor(cupsSaved / 5) + 1;
  const progress = (cupsSaved % 5) * 20;
  
  // Tree size scales with level
  const getTreeSize = () => {
    if (level <= 3) return "w-16 h-16";
    if (level <= 6) return "w-24 h-24";
    if (level <= 10) return "w-32 h-32";
    return "w-40 h-40";
  };

  const getTreeColor = () => {
    if (level <= 3) return "text-mint";
    if (level <= 6) return "text-secondary";
    if (level <= 10) return "text-primary";
    return "text-forest-dark";
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Sky background */}
      <div className="w-full h-64 rounded-3xl bg-gradient-to-b from-info/20 via-accent to-mint-light relative overflow-hidden">
        {/* Sun */}
        <div className="absolute top-6 right-8 w-12 h-12 rounded-full bg-warning/80 shadow-lg animate-pulse-soft" />
        
        {/* Clouds */}
        <div className="absolute top-8 left-8 w-16 h-6 bg-white/60 rounded-full blur-sm" />
        <div className="absolute top-12 left-16 w-12 h-4 bg-white/40 rounded-full blur-sm" />
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/30 to-transparent" />
        
        {/* Tree Container */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Tree */}
          <div className={cn(
            "transition-all duration-700 ease-out animate-float",
            getTreeSize(),
            getTreeColor()
          )}>
            {level < 5 ? (
              <Leaf className="w-full h-full drop-shadow-lg" />
            ) : level < 10 ? (
              <TreeDeciduous className="w-full h-full drop-shadow-lg" />
            ) : (
              <TreePine className="w-full h-full drop-shadow-lg" />
            )}
          </div>
          
          {/* Ground decorations */}
          <div className="flex gap-2 mt-2">
            {Array.from({ length: Math.min(level, 5) }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary/40"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Floating particles/butterflies for higher levels */}
        {level > 5 && (
          <>
            <div className="absolute top-20 left-1/4 text-secondary animate-float" style={{ animationDelay: "500ms" }}>
              🦋
            </div>
            <div className="absolute top-16 right-1/3 text-secondary animate-float" style={{ animationDelay: "1000ms" }}>
              🌸
            </div>
          </>
        )}
      </div>

      {/* Tree Info */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="text-lg font-bold text-foreground">
            {level < 5 ? "Seedling" : level < 10 ? "Oak Tree" : "Mighty Oak"}
          </h3>
          <span className="badge-eco">Lv.{level}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">
          {5 - (cupsSaved % 5)} gelas lagi untuk naik level
        </p>
        
        <div className="w-48 mx-auto">
          <div className="progress-eco h-3">
            <div 
              className="progress-eco-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};