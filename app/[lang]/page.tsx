import { articles } from '@/lib/articles-data';
import { articlesAr } from '@/lib/articles-data-ar';
import { HomeView } from '@/components/site/home/HomeView';

/**
 * Server shell for the homepage. The page itself is a client component — the
 * hero, the FAQ accordion and the language toggle all need state — so the three
 * most recent articles are picked here and handed down as props. That keeps the
 * full article datasets on the server instead of in the browser bundle.
 */
export default function Page() {
  const recent = [...articles]
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 3)
    .map((a) => ({
      slug: a.slug,
      published: a.published,
      readingMinutes: a.readingMinutes,
      topic: a.topic,
      title: a.title,
      excerpt: a.excerpt,
      topicAr: articlesAr[a.slug]?.topic,
      titleAr: articlesAr[a.slug]?.title,
      excerptAr: articlesAr[a.slug]?.excerpt,
    }));

  return <HomeView recent={recent} />;
}
