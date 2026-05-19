import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, Brain, Loader2, Globe } from "lucide-react";
import { Header } from "@/components/Header";
import { quizService, type QuizBook } from "@/services/api";
import { useI18n } from "@/lib/i18n";
import { bookSlug, localizedBookName } from "@/data/bible";

export const Route = createFileRoute("/book/$book")({
  head: () => ({ meta: [{ title: "Book — Bible Quiz" }] }),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { book: slug } = Route.useParams();
  const { lang, setLang, languages, languageId } = useI18n();

  const booksQ = useQuery({
    queryKey: ["quiz-books"],
    queryFn: () => quizService.getBooks(),
    staleTime: 1000 * 60 * 10,
  });

  const books: QuizBook[] = booksQ.data?.data ?? [];
  const book = books.find((b) => bookSlug(b.name) === slug);
  const localized = book ? localizedBookName(book.name, lang) : slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All books
          </Link>
          <Link
            to="/read/$book"
            params={{ book: slug }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
          >
            <BookOpen className="h-3.5 w-3.5" /> Read book
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-10">
        {booksQ.isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading book…
          </div>
        ) : !book ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-center text-sm text-destructive">
            Book not found.
          </div>
        ) : (
          <>
            <section className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Bible Book</p>
              <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
                {localized}
              </h1>
              {localized !== book.name && (
                <p className="mt-1 text-sm text-muted-foreground">{book.name}</p>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                {book.total_questions} total questions · {book.levels.length} levels
              </p>
            </section>

            <section className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <label className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Globe className="h-3.5 w-3.5" /> Quiz language
              </label>
              <div className="flex flex-wrap gap-2">
                {languages.length === 0 ? (
                  <span className="text-sm text-muted-foreground">Loading languages…</span>
                ) : (
                  languages.map((l) => (
                    <button
                      key={l.language_id}
                      onClick={() => setLang(l.code)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        l.code === lang
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/40"
                      }`}
                    >
                      {l.native_name || l.name}
                    </button>
                  ))
                )}
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
                Choose a level
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {book.levels.map((lv) => (
                  <article
                    key={lv.level_id}
                    className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                          Level
                        </p>
                        <h3 className="font-serif text-xl font-semibold text-card-foreground">
                          {lv.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                        {lv.question_count} Q
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {lv.question_count} questions in {localized}.
                    </p>
                    <div className="mt-4">
                      {languageId ? (
                        <Link
                          to="/quiz/$book"
                          params={{ book: slug }}
                          search={{
                            book_id: book.book_id,
                            level_id: lv.level_id,
                            language_id: languageId,
                          }}
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                          <Brain className="h-4 w-4" /> Start Quiz
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary/40 px-4 py-2 text-sm font-medium text-primary-foreground opacity-60"
                        >
                          <Brain className="h-4 w-4" /> Start Quiz
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}