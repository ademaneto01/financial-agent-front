import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useState } from 'react';
import { MetadataViewer } from './MetadataViewer';
import { ScoreBar } from '@/components/agent/parts/ScoreBar';
import { cn } from '@/lib/cn';
import { percent } from '@/lib/format';
import type { SearchHit } from '@/types/api';

interface SearchResultCardProps {
  hit: SearchHit;
  index: number;
}

export function SearchResultCard({ hit, index }: SearchResultCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showMeta, setShowMeta] = useState(false);

  const hasMetadata = hit.metadata && Object.keys(hit.metadata).length > 0;

  return (
    <article className="card p-4 md:p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[11px] font-semibold text-slate-300">
            {index + 1}
          </span>
          <FileText className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Result
          </span>
        </div>
        <span className="font-mono text-xs tabular-nums text-slate-300">
          score <span className="text-slate-100">{percent(hit.score)}</span>
        </span>
      </header>

      <div className="mt-3">
        <ScoreBar value={hit.score} showValue={false} />
      </div>

      <div className="mt-4">
        <p
          className={cn(
            'whitespace-pre-wrap text-sm leading-relaxed text-slate-100',
            !expanded && 'line-clamp-6',
          )}
        >
          {hit.text}
        </p>
        {hit.text.length > 280 && (
          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-indigo-200"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                Expand
              </>
            )}
          </button>
        )}
      </div>

      {hasMetadata && (
        <div className="mt-4 border-t border-white/5 pt-3">
          <button
            type="button"
            onClick={() => setShowMeta((s) => !s)}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200"
          >
            {showMeta ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
            {showMeta ? 'Hide metadata' : 'Show metadata'}
          </button>
          {showMeta && (
            <div className="mt-2 rounded-lg border border-white/5 bg-black/20 p-3">
              <MetadataViewer data={hit.metadata} />
            </div>
          )}
        </div>
      )}
    </article>
  );
}
