import { useState } from "react";
import StickyProgressBar from "@/components/StickyProgressBar";
import LessonCard from "@/components/LessonCard";
import { lessons, eras } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();
  const { currentLesson, completedLessons } = useProgress();
  const [filterEra, setFilterEra] = useState<string>("all");

  const filtered = filterEra === "all" ? lessons : lessons.filter((l) => l.era === filterEra);

  return (
    <div className="min-h-screen bg-background">
      <StickyProgressBar />

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">
        <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
          180 Lessons in Philosophy
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From Plato's cave to modern consciousness — a guided journey through humanity's greatest ideas.
        </p>
      </div>

      {/* Era Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setFilterEra("all")}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filterEra === "all"
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            All Eras
          </button>
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setFilterEra(era)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filterEra === era
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={user ? completedLessons.includes(lesson.id) : false}
              isCurrent={user ? lesson.id === currentLesson : false}
              isLocked={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
