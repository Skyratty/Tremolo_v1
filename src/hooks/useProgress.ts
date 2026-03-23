import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useProgress() {
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setCurrentLesson(1);
      setCompletedLessons([]);
      return;
    }

    const fetchProgress = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setCurrentLesson(data.current_lesson);
        setCompletedLessons(data.completed_lessons ?? []);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user]);

  const advanceLesson = async () => {
    if (!user) return;

    const newCompleted = [...completedLessons, currentLesson];
    const newCurrent = currentLesson + 1;

    const { data: existing } = await supabase
      .from("user_progress")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("user_progress")
        .update({
          current_lesson: newCurrent,
          completed_lessons: newCompleted,
        })
        .eq("user_id", user.id);
    } else {
      await supabase
        .from("user_progress")
        .insert({
          user_id: user.id,
          current_lesson: newCurrent,
          completed_lessons: newCompleted,
        });
    }

    setCurrentLesson(newCurrent);
    setCompletedLessons(newCompleted);
  };

  return { currentLesson, completedLessons, advanceLesson, loading };
}
