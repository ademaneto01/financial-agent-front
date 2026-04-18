import { Clock, TrendingUp } from 'lucide-react';
import { ActionBadge } from './parts/ActionBadge';
import { ScoreBar } from './parts/ScoreBar';
import type { FinalRecommendation } from '@/types/api';

interface TickerHeaderProps {
  ticker: string;
  query: string;
  recommendation: FinalRecommendation;
}

export function TickerHeader({ ticker, query, recommendation }: TickerHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-200">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{ticker}</h2>
            <ActionBadge action={recommendation.action} size="md" />
          </div>
          <p className="mt-1 truncate text-sm text-slate-400" title={query}>
            {query}
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <ScoreBar value={recommendation.confidence} label="Confidence" />
        <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{recommendation.time_horizon}</span>
        </div>
      </div>
    </div>
  );
}
