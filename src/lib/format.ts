import type {
  FinalAction,
  InvestmentGrade,
  MomentumDir,
  MomentumStrength,
  Outlook,
  Recommendation,
  SentimentDir,
} from '@/types/api';

/** Format a 0..1 (or -1..1) score as a percentage string. */
export function percent(score: number, opts: { signed?: boolean } = {}): string {
  const v = Math.round(score * 100);
  if (opts.signed && v > 0) return `+${v}%`;
  return `${v}%`;
}

/** Clamp value between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function gradeColor(grade: InvestmentGrade): string {
  switch (grade) {
    case 'A':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'B':
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    case 'C':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'D':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  }
}

export function actionColor(action: FinalAction | Uppercase<Recommendation>): string {
  switch (action) {
    case 'BUY':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'HOLD':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'SELL':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    case 'AVOID':
      return 'bg-rose-500/20 text-rose-200 border-rose-500/40';
    default:
      return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
  }
}

export function recommendationColor(rec: Recommendation): string {
  return actionColor(rec.toUpperCase() as Uppercase<Recommendation>);
}

export function momentumColor(dir: MomentumDir): string {
  switch (dir) {
    case 'positive':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'neutral':
      return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    case 'negative':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  }
}

export function momentumStrengthColor(s: MomentumStrength): string {
  switch (s) {
    case 'strong':
      return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    case 'moderate':
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    case 'weak':
      return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
  }
}

export function outlookColor(o: Outlook): string {
  switch (o) {
    case 'bullish':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'neutral':
      return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    case 'bearish':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  }
}

export function sentimentColor(dir: SentimentDir): string {
  switch (dir) {
    case 'Positive':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'Neutral':
      return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    case 'Negative':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  }
}

export function scoreBarColor(value: number): string {
  if (value >= 0.66) return 'bg-emerald-500';
  if (value >= 0.33) return 'bg-amber-500';
  return 'bg-rose-500';
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
