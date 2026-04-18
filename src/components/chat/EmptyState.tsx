import { BrainCircuit, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { QueryMode } from '@/types/api';

interface Suggestion {
  mode: QueryMode;
  title: string;
  query: string;
}

const SUGGESTIONS: Suggestion[] = [
  {
    mode: 'agent',
    title: 'Full analysis',
    query: 'Give me a full investment analysis of AAPL',
  },
  {
    mode: 'search',
    title: 'Knowledge base',
    query: 'earnings guidance and margins',
  },
];

interface EmptyStateProps {
  onPick: (suggestion: Suggestion) => void;
}

export function EmptyState({ onPick }: EmptyStateProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-200 shadow-glow">
        <Sparkles className="h-6 w-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Financial Agent
        </h1>
        <p className="max-w-md text-sm text-slate-400">
          Ask for a structured investment analysis in{' '}
          <span className="font-semibold text-indigo-300">Agent</span> mode, or query the knowledge
          base in <span className="font-semibold text-cyan-300">Search</span> mode.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((s, i) => {
          const Icon = s.mode === 'agent' ? BrainCircuit : Search;
          const accent =
            s.mode === 'agent'
              ? 'hover:border-indigo-500/30 hover:bg-indigo-500/5'
              : 'hover:border-cyan-500/30 hover:bg-cyan-500/5';
          return (
            <button
              key={i}
              type="button"
              onClick={() => onPick(s)}
              className={cn(
                'card flex flex-col items-start gap-2 p-4 text-left transition',
                accent,
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-slate-300" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {s.mode}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-100">{s.title}</span>
              <span className="text-xs text-slate-400">{s.query}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
