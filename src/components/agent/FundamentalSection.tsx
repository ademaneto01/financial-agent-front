import { BookOpen } from 'lucide-react';
import { BulletList } from './parts/BulletList';
import { GradeBadge } from './parts/GradeBadge';
import { ScoreBar } from './parts/ScoreBar';
import { cn } from '@/lib/cn';
import { capitalize, recommendationColor } from '@/lib/format';
import type { FundamentalAnalysis } from '@/types/api';

interface FundamentalSectionProps {
  analysis: FundamentalAnalysis;
}

export function FundamentalSection({ analysis }: FundamentalSectionProps) {
  const {
    overall_investment_thesis,
    investment_grade,
    confidence_score,
    key_strengths,
    key_concerns,
    recommendation,
  } = analysis;

  return (
    <section className="card p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-indigo-300" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Fundamental analysis
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <GradeBadge grade={investment_grade} />
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
              recommendationColor(recommendation),
            )}
          >
            {capitalize(recommendation)}
          </span>
        </div>
      </header>

      <div className="mt-4 max-w-md">
        <ScoreBar value={confidence_score} label="Confidence" />
      </div>

      <blockquote className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm italic leading-relaxed text-slate-200">
        “{overall_investment_thesis}”
      </blockquote>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <BulletList tone="positive" title="Key strengths" items={key_strengths} />
        <BulletList tone="negative" title="Key concerns" items={key_concerns} />
      </div>
    </section>
  );
}
