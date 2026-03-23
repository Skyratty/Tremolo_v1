import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowRight } from "lucide-react";

const StickyProgressBar = () => {
  const { user, signOut } = useAuth();
  const { currentLesson, advanceLesson } = useProgress();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1
          className="font-display font-bold text-foreground cursor-pointer text-2xl"
          onClick={() => navigate("/")}>
          
          Tremolo
        </h1>

        {user ?
        <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Lesson <span className="text-foreground font-semibold">{currentLesson}</span> of 180
            </span>
            <Button
            size="sm"
            onClick={advanceLesson}
            disabled={currentLesson > 180}
            className="gap-1">
            
              Next Lesson <ArrowRight className="w-3.5 h-3.5" />
            </Button>
            <button
            onClick={signOut}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Sign out">
            
              <LogOut className="w-4 h-4" />
            </button>
          </div> :

        <Button size="sm" variant="outline" onClick={() => navigate("/auth")}>
            Sign in to track progress
          </Button>
        }
      </div>
    </div>);

};

export default StickyProgressBar;