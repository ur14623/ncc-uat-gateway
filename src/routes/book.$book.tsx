import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Globe } from "lucide-react";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { bibleService } from "@/services/api";
import { useI18n } from "@/lib/i18n";
import { findBook, localizedBookName } from "@/data/bible";

export const Route = createFileRoute("/book/$book")({
  head: () => ({ meta: [{ title: "Book — Bible" }] }),
  component: BookDetailPage,
});

function slugToBookName(slug: string): string {
  return slug
    .split("-")
    .map((p) => (p.match(/^\d+$/) ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(" ");
}

function BookDetailPage() {
  const { book: slug } = Route.useParams();
  const { lang, setLang, languages } = useI18n();
  const bookName = findBook(slug)?.name ?? slugToBookName(slug);
  const localized = localizedBookName(bookName, lang);

  const fullQ = useQuery({
    queryKey: ["bible-full-book", bookName, lang],
    queryFn: () => bibleService.getFullBook(bookName, lang),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const chapters = fullQ.data?.chapters ?? [];
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const currentChapter = useMemo(() => {
    if (!chapters.length) return null;
    return chapters.find((c) => c.chapter === activeChapter) ?? chapters[0];
  }, [chapters, activeChapter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All books
          </Link>
          <span />
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <section className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Bible Book</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            {localized}
          </h1>
          {localized !== bookName && (
            <p className="mt-1 text-sm text-muted-foreground">{bookName}</p>
          )}
        </section>

        <section className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <label className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Globe className="h-3.5 w-3.5" /> Language
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.length === 0 ? (
              <span className="text-sm text-muted-foreground">Loading languages…</span>
            ) : (
              languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLang(l.code)}
                  className={`border px-3 py-1.5 text-xs font-medium transition ${
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

        {fullQ.isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading {bookName}…
          </div>
        ) : fullQ.isError ? (
          <div className="border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load book. {(fullQ.error as Error)?.message}
          </div>
        ) : chapters.length === 0 ? (
          <div className="border border-border bg-card p-4 text-sm text-muted-foreground">
            No chapters available.
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              {chapters.map((c) => (
                <button
                  key={c.chapter}
                  onClick={() => setActiveChapter(c.chapter)}
                  className={`min-w-10 px-3 py-1.5 text-sm font-medium border transition ${
                    c.chapter === currentChapter?.chapter
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {c.chapter}
                </button>
              ))}
            </div>

            {currentChapter && (
              <article className="pb-16">
                <h3 className="mb-3 font-serif text-2xl font-semibold text-foreground">
                  {localized} {currentChapter.chapter}
                </h3>
                <div className="prose prose-stone max-w-none font-serif text-lg leading-relaxed text-foreground">
                  {currentChapter.verses.map((v) => (
                    <p key={v.verse} className="mb-3">
                      <sup className="mr-1 text-xs font-semibold text-primary">{v.verse}</sup>
                      {v.text}
                    </p>
                  ))}
                </div>
              </article>
            )}
          </>
        )}
      </main>
    </div>
  );
}