import { BrainCircuit, Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { QueryMode } from '@/types/api';

interface ModeBadgeProps {
  mode: QueryMode;
  className?: string;
}

export function ModeBadge({ mode, className }: ModeBadgeProps) {
  const isAgent = mode === 'agent';
  const Icon = isAgent ? BrainCircuit : Search;
  const label = isAgent ? 'Agent' : 'Search';
  const tone = isAgent
    ? 'bg-indigo-500/10 text-indigo-200 ring-indigo-500/30'
    : 'bg-cyan-500/10 text-cyan-200 ring-cyan-500/30';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset',
        tone,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
