import { cn } from '@/lib/cn';
import { clamp, percent, scoreBarColor } from '@/lib/format';

interface ScoreBarProps {
  /** 0..1 for `standard`, -1..1 for `bipolar`. */
  value: number;
  variant?: 'standard' | 'bipolar';
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ScoreBar({
  value,
  variant = 'standard',
  label,
  showValue = true,
  className,
}: ScoreBarProps) {
  if (variant === 'bipolar') {
    const v = clamp(value, -1, 1);
    const width = Math.abs(v) * 50; // 0..50 %
    const isPositive = v >= 0;
    const fillColor = isPositive ? 'bg-emerald-500' : 'bg-rose-500';

    return (
      <div className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
            {label ? <span>{label}</span> : <span />}
            {showValue && (
              <span className="font-mono tabular-nums text-slate-300">
                {percent(v, { signed: true })}
              </span>
            )}
          </div>
        )}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/15" />
          <div
            className={cn('absolute top-0 h-full rounded-full transition-all', fillColor)}
            style={{
              left: isPositive ? '50%' : `${50 - width}%`,
              width: `${width}%`,
            }}
          />
        </div>
      </div>
    );
  }

  const v = clamp(value, 0, 1);
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          {label ? <span>{label}</span> : <span />}
          {showValue && (
            <span className="font-mono tabular-nums text-slate-300">{percent(v)}</span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={cn('h-full rounded-full transition-all', scoreBarColor(v))}
          style={{ width: `${v * 100}%` }}
        />
      </div>
    </div>
  );
}
