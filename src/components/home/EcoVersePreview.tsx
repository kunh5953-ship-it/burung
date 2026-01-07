import { TreeDeciduous, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EcoVersePreviewProps {
  cupsSaved: number;
}

export const EcoVersePreview = ({ cupsSaved }: EcoVersePreviewProps) => {
  const navigate = useNavigate();
  
  // Calculate tree level based on cups saved
  const treeLevel = Math.floor(cupsSaved / 5) + 1;
  const progressToNextLevel = (cupsSaved % 5) * 20;

  return (
    <div 
      onClick={() => navigate("/impact")}
      className="card-mint mx-4 cursor-pointer hover:shadow-eco-md transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <TreeDeciduous className="w-8 h-8 text-primary animate-float" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">Eco-Verse</h3>
            <span className="badge-eco">Lv.{treeLevel}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Pohon Oak kamu sedang tumbuh!
          </p>
          <div className="progress-eco">
            <div 
              className="progress-eco-fill"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
        </div>

        <div className="text-muted-foreground group-hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};