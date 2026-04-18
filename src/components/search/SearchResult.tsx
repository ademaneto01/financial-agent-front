import { Info, SearchX } from 'lucide-react';
import { SearchResultCard } from './SearchResultCard';
import type { SearchResponse } from '@/types/api';

interface SearchResultProps {
  data: SearchResponse;
}

export function SearchResult({ data }: SearchResultProps) {
  if (!data.results || data.results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
        <SearchX className="h-8 w-8 text-slate-500" />
        <p className="text-sm text-slate-300">No results found.</p>
        <p className="text-xs text-slate-500">Try a different query or increase the limit.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-xs text-cyan-100">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
        <p>
          These are <strong>search results</strong> from the knowledge base, not a final investment
          analysis. Use <strong>Agent mode</strong> for a structured recommendation.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {data.results.map((hit, i) => (
          <SearchResultCard key={i} hit={hit} index={i} />
        ))}
      </div>
    </div>
  );
}
