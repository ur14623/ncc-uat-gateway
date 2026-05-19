import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { bibleService, removeDuplicateVerses, type BibleVerse } from "@/services/api";
import { useI18n } from "@/lib/i18n";
import { findBook, localizedBookName } from "@/data/bible";

export const Route = createFileRoute("/read/$book")({
  component: ReadPage,
});

function ReadPage() {
  const { book: slug } = Route.useParams();
  const { t, lang } = useI18n();
  const localBook = findBook(slug);
  const bookName = localBook?.name ?? slug.replace(/-/g, " ");

  const q = useQuery({
    queryKey: ["bible-book", bookName, lang],
    queryFn: () => bibleService.getFullBook(bookName, lang),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  const localized = localizedBookName(bookName, lang);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t.backToBooks}
          </Link>
          <h1 className="font-serif text-lg font-semibold text-foreground">{localized}</h1>
          <span />
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {q.isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading book…
          </div>
        ) : q.isError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load book. {(q.error as Error)?.message}
          </div>
        ) : !q.data ? null : (
          <article className="space-y-8 pb-16">
            <header>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">{lang}</p>
              <h2 className="font-serif text-3xl font-semibold text-foreground">{localized}</h2>
            </header>
            {q.data.chapters.map((ch) => (
              <ChapterBlock key={ch.chapter} chapter={ch.chapter} verses={ch.verses} />
            ))}
          </article>
        )}
      </main>
    </div>
  );
}

function ChapterBlock({ chapter, verses }: { chapter: number; verses: BibleVerse[] }) {
  const { t } = useI18n();
  const clean = removeDuplicateVerses(verses);
  return (
    <section>
      <h3 className="mb-3 font-serif text-2xl font-semibold text-foreground">
        {t.chapter} {chapter}
      </h3>
      <div className="prose prose-stone max-w-none font-serif text-lg leading-relaxed text-foreground">
        {clean.map((v) => (
          <p key={v.verse} className="mb-3">
            <sup className="mr-1 text-xs font-semibold text-primary">{v.verse}</sup>
            {v.text}
          </p>
        ))}
      </div>
    </section>
  );
}