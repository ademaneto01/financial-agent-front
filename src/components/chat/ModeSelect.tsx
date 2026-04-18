import { BrainCircuit, Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { QueryMode } from '@/types/api';

interface ModeSelectProps {
  mode: QueryMode;
  onChange: (mode: QueryMode) => void;
  disabled?: boolean;
}

const options: { value: QueryMode; label: string; icon: typeof Search }[] = [
  { value: 'agent', label: 'Agent', icon: BrainCircuit },
  { value: 'search', label: 'Search', icon: Search },
];

export function ModeSelect({ mode, onChange, disabled }: ModeSelectProps) {
  return (
    <div
      role="tablist"
      aria-label="Query mode"
      className={cn(
        'inline-flex items-center gap-1 rounded-xl border border-white/10 bg-black/30 p-1',
        disabled && 'opacity-60',
      )}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = mode === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition',
              active
                ? 'bg-white/10 text-white shadow-inner'
                : 'text-slate-400 hover:text-slate-200',
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
