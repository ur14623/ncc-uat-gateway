import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Check, X, Home, BookOpen, ChevronDown, AlertTriangle } from "lucide-react";
import { Header } from "@/components/Header";
import { quizService, type QuizQuestion, type AnswerResult, type QuizLevel } from "@/services/api";
import { useAuth } from "@/lib/auth";
import { bookSlug, findBook, localizedBookName } from "@/data/bible";
import { useI18n } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";

type Search = { book_id: number; level_id: number; language_id: number };

export const Route = createFileRoute("/quiz/$book")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    book_id: Number(s.book_id),
    level_id: Number(s.level_id),
    language_id: Number(s.language_id),
  }),
  component: QuizPage,
});

function QuizPage() {
  const { book: slug } = Route.useParams();
  const { book_id, level_id, language_id } = Route.useSearch();
  const { user } = useAuth();
  const { lang } = useI18n();
  const navigate = useNavigate();

  const localBook = findBook(slug);
  const bookName = localBook?.name ?? slug.replace(/-/g, " ");
  const localized = localizedBookName(bookName, lang);

  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AnswerResult | null>(null);
  const [finalScore, setFinalScore] = useState<{
    score_percentage: number;
    correct_answers: number;
    wrong_answers: number;
    total_questions: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Level switcher
  const levelsQ = useQuery({
    queryKey: ["quiz-levels", book_id],
    queryFn: () => quizService.getLevels(book_id),
    enabled: !!book_id,
    staleTime: 1000 * 60 * 10,
  });
  const levels: QuizLevel[] = levelsQ.data?.data.levels ?? [];
  const currentLevel = levels.find((l) => l.level_id === level_id) ?? null;
  const [levelOpen, setLevelOpen] = useState(false);
  const [pendingLevel, setPendingLevel] = useState<QuizLevel | null>(null);
  const levelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (levelRef.current && !levelRef.current.contains(e.target as Node)) setLevelOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const confirmLevelChange = () => {
    if (!pendingLevel) return;
    const newLevel = pendingLevel;
    setPendingLevel(null);
    navigate({
      to: "/quiz/$book",
      params: { book: bookSlug(bookName) },
      search: { book_id, level_id: newLevel.level_id, language_id },
      replace: true,
    });
  };

  // Start quiz on mount
  useEffect(() => {
    if (!user) return;
    if (!book_id || !level_id || !language_id) {
      setError("Missing quiz parameters.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await quizService.start(book_id, level_id, language_id);
        if (cancelled) return;
        setAttemptId(res.data.attempt_id);
        setProgress({ current: 0, total: res.data.total_questions });
        await loadNext(res.data.attempt_id);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book_id, level_id, language_id, user?.email]);

  const loadNext = async (id: number) => {
    setPicked(null);
    setFeedback(null);
    const res = await quizService.next(id);
    const d = res.data as
      | { attempt_id: number; question_number: number; remaining_questions: number; question: QuizQuestion }
      | { completed: true; message: string };
    if ("completed" in d) {
      const fin = await quizService.finish(id);
      setFinalScore({
        score_percentage: fin.data.score_percentage,
        correct_answers: fin.data.correct_answers,
        wrong_answers: fin.data.wrong_answers,
        total_questions: fin.data.total_questions,
      });
      setQuestion(null);
    } else {
      setQuestion(d.question);
      setProgress({
        current: d.question_number,
        total: d.question_number + d.remaining_questions,
      });
    }
  };

  const submit = async () => {
    if (!attemptId || !question || !picked) return;
    try {
      setLoading(true);
      const res = await quizService.answer(attemptId, question.question_id, picked);
      setFeedback(res.data);
      if (res.data.quiz_completed && res.data.final_score) {
        setFinalScore(res.data.final_score);
        setQuestion(null);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    if (!attemptId) return;
    try {
      setLoading(true);
      await loadNext(attemptId);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-md px-4 py-16 text-center">
          <p className="mb-4 text-muted-foreground">You must log in to take a quiz.</p>
          <Link
            to="/login"
            className="inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            Login
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <h1 className="font-serif text-lg font-semibold text-foreground">{localized} Quiz</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground tabular-nums">
              {progress.total > 0 ? `${progress.current} / ${progress.total}` : ""}
            </span>
            {levels.length > 0 && (
              <div className="relative" ref={levelRef}>
                <button
                  type="button"
                  onClick={() => setLevelOpen((o) => !o)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40"
                >
                  {currentLevel ? (
                    <>
                      <span style={{ color: currentLevel.color }}>{currentLevel.icon}</span>
                      <span>{currentLevel.name}</span>
                    </>
                  ) : (
                    <span>Level</span>
                  )}
                  <ChevronDown className={`h-3.5 w-3.5 transition ${levelOpen ? "rotate-180" : ""}`} />
                </button>
                {levelOpen && (
                  <div className="absolute right-0 z-30 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
                    <ul className="max-h-80 overflow-y-auto py-1">
                      {levels.map((lvl) => {
                        const active = lvl.level_id === level_id;
                        return (
                          <li key={lvl.level_id}>
                            <button
                              type="button"
                              onClick={() => {
                                setLevelOpen(false);
                                if (active) return;
                                if (finalScore) {
                                  navigate({
                                    to: "/quiz/$book",
                                    params: { book: bookSlug(bookName) },
                                    search: { book_id, level_id: lvl.level_id, language_id },
                                    replace: true,
                                  });
                                } else {
                                  setPendingLevel(lvl);
                                }
                              }}
                              className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition hover:bg-secondary ${
                                active ? "bg-secondary/70" : ""
                              }`}
                            >
                              <span
                                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-lg"
                                style={{ backgroundColor: `${lvl.color}25`, color: lvl.color }}
                              >
                                {lvl.icon}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-foreground">{lvl.name}</span>
                                  {active && (
                                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                                      Current
                                    </span>
                                  )}
                                </span>
                                <span className="line-clamp-2 text-xs text-muted-foreground">
                                  {lvl.description}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="border-t border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
                      Changing level will restart the quiz.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {error && (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading && !question && !finalScore ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading quiz…
          </div>
        ) : finalScore ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Quiz Result</p>
            <div className="mt-3 font-serif text-5xl font-semibold text-foreground">
              {finalScore.correct_answers}
              <span className="text-muted-foreground"> / {finalScore.total_questions}</span>
            </div>
            <p className="mt-2 text-lg text-primary">
              {finalScore.score_percentage.toFixed(0)}%
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() =>
                  navigate({
                    to: "/quiz/$book",
                    params: { book: bookSlug(bookName) },
                    search: { book_id, level_id, language_id },
                    replace: true,
                  })
                }
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Retake
              </button>
              <Link
                to="/read/$book"
                params={{ book: bookSlug(bookName) }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <BookOpen className="h-4 w-4" /> Read Book
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <Home className="h-4 w-4" /> Home
              </Link>
            </div>
          </div>
        ) : question ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 text-xs font-medium text-muted-foreground">
              {question.verse_reference}
            </div>
            <h2 className="mb-6 font-serif text-xl font-semibold text-card-foreground">
              {question.text}
            </h2>
            <div className="space-y-2">
              {question.options.map((opt) => {
                const isPicked = picked === opt.label;
                const correct = feedback?.correct_option.label === opt.label;
                const wrongPick = feedback && isPicked && !feedback.is_correct;
                return (
                  <button
                    key={opt.label}
                    onClick={() => !feedback && setPicked(opt.label)}
                    disabled={!!feedback}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                      feedback && correct
                        ? "border-primary bg-primary/10"
                        : wrongPick
                          ? "border-destructive bg-destructive/10"
                          : isPicked
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-xs font-medium">
                      {opt.label}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                    {feedback && correct && <Check className="h-4 w-4 text-primary" />}
                    {wrongPick && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className="mt-4 rounded-lg border border-border bg-background p-3 text-sm">
                {feedback.verse_reference && (
                  <p className="font-medium text-foreground">{feedback.verse_reference}</p>
                )}
                {feedback.verse_text && (
                  <p className="mt-1 italic text-muted-foreground">{feedback.verse_text}</p>
                )}
                {feedback.explanation && (
                  <p className="mt-2 text-muted-foreground">{feedback.explanation}</p>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              {feedback ? (
                <button
                  onClick={next}
                  className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
                >
                  {feedback.quiz_completed ? "See Result" : "Next"}
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!picked || loading}
                  className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground disabled:opacity-40"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : null}
      </main>

      {pendingLevel && currentLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg font-semibold text-foreground">Change difficulty?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Switching from <span className="font-medium text-foreground">{currentLevel.name}</span> to{" "}
                  <span className="font-medium text-foreground">{pendingLevel.name}</span> will restart the quiz with new
                  questions. Current progress ({progress.current}/{progress.total}) will be lost.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setPendingLevel(null)}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmLevelChange}
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Confirm change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}