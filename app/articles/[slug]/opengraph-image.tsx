import { ImageResponse } from '@vercel/og';
import { articles, getArticleBySlug } from '@/lib/articles-data';

export const runtime = 'edge';
export const alt = 'DAMASAVERO article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

/**
 * Per-article social card. Generated from the article data so it can never
 * drift from the headline, drawn in the same dark charcoal and emerald as the
 * site. No external assets — everything here is layout and type.
 */
export default function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? 'DAMASAVERO';
  const topic = article?.topic ?? 'Articles';
  const minutes = article?.readingMinutes;
  const footerMeta = minutes ? `${minutes} min read · damasavero.com` : 'damasavero.com';

  const INK = '#f1efe9';
  const MUTED = 'rgba(241, 239, 233, 0.62)';
  const BRAND = '#6fb08f';
  const GROUND = '#101412';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: GROUND,
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* emerald hairline, same device as the site's section edges */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 4,
            background: BRAND,
          }}
        />

        {/* a few fragments, echoing the hero geometry */}
        {[
          { x: 880, y: 120, s: 86, o: 0.1 },
          { x: 1010, y: 300, s: 54, o: 0.16 },
          { x: 930, y: 440, s: 30, o: 0.22 },
        ].map((f) => (
          <div
            key={f.x}
            style={{
              position: 'absolute',
              left: f.x,
              top: f.y,
              width: f.s,
              height: f.s,
              border: `2px solid ${BRAND}`,
              opacity: f.o,
              transform: 'rotate(45deg)',
            }}
          />
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 34, height: 3, background: BRAND }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: BRAND,
            }}
          >
            {topic}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 64 ? 60 : 72,
            lineHeight: 1.1,
            color: INK,
            letterSpacing: -1.5,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(241, 239, 233, 0.18)',
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 9,
              textTransform: 'uppercase',
              color: INK,
            }}
          >
            DAMASAVERO
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: MUTED }}>{footerMeta}</div>
        </div>
      </div>
    ),
    size
  );
}
