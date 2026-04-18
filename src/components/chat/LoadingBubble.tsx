import { Bot } from 'lucide-react';
import { ModeBadge } from './ModeBadge';
import type { QueryMode } from '@/types/api';

interface LoadingBubbleProps {
  mode: QueryMode;
}

function AgentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-24" />
        <div className="skeleton h-7 w-20 rounded-full" />
        <div className="skeleton h-7 w-24 rounded-full" />
      </div>
      <div className="skeleton h-24 w-full" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="skeleton h-32" />
        <div className="skeleton h-32" />
      </div>
      <div className="skeleton h-24" />
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="skeleton h-20" />
      <div className="skeleton h-20" />
      <div className="skeleton h-20" />
    </div>
  );
}

export function LoadingBubble({ mode }: LoadingBubbleProps) {
  return (
    <div className="flex w-full animate-fade-in gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500/20 to-purple-500/10">
        <Bot className="h-4 w-4 text-indigo-300" />
      </div>
      <div className="card flex-1 p-4 md:p-5">
        <div className="mb-3 flex items-center gap-2">
          <ModeBadge mode={mode} />
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            {mode === 'agent' ? 'Analyzing…' : 'Searching…'}
          </span>
        </div>
        {mode === 'agent' ? <AgentSkeleton /> : <SearchSkeleton />}
      </div>
    </div>
  );
}
