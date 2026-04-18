import { Target } from 'lucide-react';
import { ActionBadge } from './parts/ActionBadge';
import { BulletList } from './parts/BulletList';
import { ScoreBar } from './parts/ScoreBar';
import { cn } from '@/lib/cn';
import type { FinalRecommendation } from '@/types/api';

interface FinalRecommendationCardProps {
  recommendation: FinalRecommendation;
}

const actionGradient: Record<FinalRecommendation['action'], string> = {
  BUY: 'from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/30',
  HOLD: 'from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/30',
  SELL: 'from-rose-500/15 via-rose-500/5 to-transparent border-rose-500/30',
};

export function FinalRecommendationCard({ recommendation }: FinalRecommendationCardProps) {
  const { action, confidence, rationale, key_opportunities, key_risks, time_horizon } =
    recommendation;

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5',
        actionGradient[action],
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-slate-300" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
            Final recommendation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ActionBadge action={action} size="lg" />
          <span className="pill">{time_horizon}</span>
        </div>
      </div>

      <div className="mt-4">
        <ScoreBar value={confidence} label="Confidence" />
      </div>

      <blockquote className="mt-4 border-l-2 border-white/10 pl-4 text-sm leading-relaxed text-slate-100">
        {rationale}
      </blockquote>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <BulletList tone="positive" title="Opportunities" items={key_opportunities} />
        <BulletList tone="warning" title="Risks" items={key_risks} />
      </div>
    </section>
  );
}
