import { useNavigate } from "react-router-dom";
import { Lesson } from "@/data/lessons";
import { CheckCircle2, Lock, BookOpen } from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
}

const LessonCard = ({ lesson, isCompleted, isCurrent, isLocked }: LessonCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/chapter/${lesson.slug}`)}
      className={`w-full text-left rounded-lg border p-4 transition-all duration-200 group
        ${isCurrent
          ? "border-foreground shadow-card-hover bg-card"
          : isCompleted
          ? "border-border bg-secondary/30 shadow-card"
          : "border-border bg-card shadow-card hover:shadow-card-hover"
        }
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-muted-foreground font-mono">#{lesson.id}</span>
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 text-foreground/40" />
        ) : isCurrent ? (
          <BookOpen className="w-4 h-4 text-foreground" />
        ) : isLocked ? (
          <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
        ) : null}
      </div>
      <h3 className="font-display font-semibold text-foreground text-sm mb-1 group-hover:underline">
        {lesson.title}
      </h3>
      <p className="text-xs text-muted-foreground mb-2 italic">{lesson.book} — {lesson.author}</p>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{lesson.description}</p>
      <div className="mt-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">{lesson.era}</span>
      </div>
    </button>
  );
};

export default LessonCard;
