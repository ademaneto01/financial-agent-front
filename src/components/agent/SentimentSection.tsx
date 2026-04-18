import { Newspaper } from 'lucide-react';
import { BulletList } from './parts/BulletList';
import { ScoreBar } from './parts/ScoreBar';
import { cn } from '@/lib/cn';
import { sentimentColor } from '@/lib/format';
import type { SentimentAnalysis } from '@/types/api';

interface SentimentSectionProps {
  analysis: SentimentAnalysis;
}

export function SentimentSection({ analysis }: SentimentSectionProps) {
  const {
    sentiment_score,
    sentiment_direction,
    key_news_themes,
    recent_catalysts,
    market_outlook,
  } = analysis;

  return (
    <section className="card p-5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-purple-300" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Sentiment analysis
          </h3>
        </div>
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
            sentimentColor(sentiment_direction),
          )}
        >
          {sentiment_direction}
        </span>
      </header>

      <div className="mt-4 max-w-md">
        <ScoreBar value={sentiment_score} variant="bipolar" label="Sentiment score" />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-200">{market_outlook}</p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <BulletList tone="info" title="News themes" items={key_news_themes} />
        <BulletList tone="info" title="Recent catalysts" items={recent_catalysts} />
      </div>
    </section>
  );
}
