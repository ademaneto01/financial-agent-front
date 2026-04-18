import { Activity } from 'lucide-react';
import { BulletList } from './parts/BulletList';
import { ScoreBar } from './parts/ScoreBar';
import { cn } from '@/lib/cn';
import { capitalize, momentumColor, momentumStrengthColor, outlookColor } from '@/lib/format';
import type { MomentumAnalysis } from '@/types/api';

interface MomentumSectionProps {
  analysis: MomentumAnalysis;
}

export function MomentumSection({ analysis }: MomentumSectionProps) {
  const {
    overall_momentum,
    momentum_strength,
    key_momentum_drivers,
    momentum_risks,
    short_term_outlook,
    momentum_score,
  } = analysis;

  return (
    <section className="card p-5">
      <header className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-cyan-300" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
          Momentum analysis
        </h3>
      </header>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
            momentumColor(overall_momentum),
          )}
        >
          Momentum: {capitalize(overall_momentum)}
        </span>
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
            momentumStrengthColor(momentum_strength),
          )}
        >
          Strength: {capitalize(momentum_strength)}
        </span>
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
            outlookColor(short_term_outlook),
          )}
        >
          Outlook: {capitalize(short_term_outlook)}
        </span>
      </div>

      <div className="mt-4 max-w-md">
        <ScoreBar
          value={momentum_score}
          variant={momentum_score < 0 ? 'bipolar' : 'standard'}
          label="Momentum score"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <BulletList tone="positive" title="Drivers" items={key_momentum_drivers} />
        <BulletList tone="warning" title="Risks" items={momentum_risks} />
      </div>
    </section>
  );
}
