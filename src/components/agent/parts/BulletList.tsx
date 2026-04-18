import { AlertTriangle, Check, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/cn';

type Tone = 'positive' | 'negative' | 'warning' | 'info';

interface BulletListProps {
  items: string[];
  tone?: Tone;
  title?: string;
  className?: string;
  emptyMessage?: string;
}

const toneStyles: Record<Tone, { icon: typeof Check; color: string; chip: string }> = {
  positive: {
    icon: Check,
    color: 'text-emerald-400',
    chip: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20',
  },
  negative: {
    icon: X,
    color: 'text-rose-400',
    chip: 'bg-rose-500/10 text-rose-300 ring-rose-500/20',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-400',
    chip: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
  },
  info: {
    icon: Sparkles,
    color: 'text-indigo-300',
    chip: 'bg-indigo-500/10 text-indigo-200 ring-indigo-500/20',
  },
};

export function BulletList({
  items,
  tone = 'info',
  title,
  className,
  emptyMessage = 'None reported',
}: BulletListProps) {
  const { icon: Icon, color, chip } = toneStyles[tone];

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title && (
        <h4
          className={cn(
            'inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset',
            chip,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {title}
        </h4>
      )}
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-200">
              <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', color)} />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
