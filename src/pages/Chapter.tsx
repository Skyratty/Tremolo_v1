import { useParams, useNavigate } from "react-router-dom";
import { chapters } from "@/data/chapters";
import { lessons } from "@/data/lessons";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Chapter = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const chapter = slug ? chapters[slug] : null;
  const lesson = lessons.find((l) => l.slug === slug);
  const lessonIndex = lesson ? lessons.findIndex((l) => l.id === lesson.id) : -1;
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  if (!chapter || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Content Coming Soon</h1>
          <p className="text-muted-foreground mb-6">This chapter is being prepared.</p>
          <Button variant="outline" onClick={() => navigate("/")}>
            ← Back to Lessons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> All Lessons
          </button>
          <span className="text-xs text-muted-foreground">Lesson {lesson.id} of 180</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{chapter.era}</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">{chapter.title}</h1>
          <p className="text-lg text-muted-foreground">
            <span className="italic">{chapter.book}</span> by {chapter.author}
          </p>
        </header>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">Overview</h2>
          <p className="text-foreground/80 leading-relaxed">{chapter.overview}</p>
        </section>

        {/* Key Concepts */}
        <section className="mb-10">
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">Key Concepts</h2>
          <ul className="space-y-2">
            {chapter.keyConcepts.map((concept, i) => (
              <li key={i} className="flex items-start gap-2 text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 shrink-0" />
                {concept}
              </li>
            ))}
          </ul>
        </section>

        {/* Main Sections */}
        {chapter.sections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">{section.heading}</h2>
            <p className="text-foreground/80 leading-relaxed">{section.content}</p>
          </section>
        ))}

        {/* Reflection Questions */}
        <section className="mb-10 bg-secondary/50 rounded-lg p-6">
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">Reflection Questions</h2>
          <ol className="space-y-3 list-decimal list-inside">
            {chapter.reflectionQuestions.map((q, i) => (
              <li key={i} className="text-foreground/80">{q}</li>
            ))}
          </ol>
        </section>

        {/* Further Reading */}
        <section className="mb-12">
          <h2 className="text-xl font-display font-semibold text-foreground mb-3">Further Reading</h2>
          <p className="text-foreground/80 leading-relaxed">{chapter.furtherReading}</p>
        </section>

        {/* Navigation */}
        <nav className="flex items-center justify-between pt-6 border-t border-border">
          {prevLesson ? (
            <button
              onClick={() => navigate(`/chapter/${prevLesson.slug}`)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Lesson {prevLesson.id}
            </button>
          ) : <div />}
          {nextLesson ? (
            <button
              onClick={() => navigate(`/chapter/${nextLesson.slug}`)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              Lesson {nextLesson.id} <ArrowRight className="w-4 h-4" />
            </button>
          ) : <div />}
        </nav>
      </article>
    </div>
  );
};

export default Chapter;
