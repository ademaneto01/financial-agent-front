import { AlertTriangle, RotateCw } from 'lucide-react';
import { ModeBadge } from './ModeBadge';
import type { ErrorMessage } from '@/types/api';

interface ErrorBubbleProps {
  message: ErrorMessage;
  onRetry: (message: ErrorMessage) => void;
}

export function ErrorBubble({ message, onRetry }: ErrorBubbleProps) {
  return (
    <div className="flex w-full animate-fade-in gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10">
        <AlertTriangle className="h-4 w-4 text-rose-300" />
      </div>
      <div className="flex-1 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 md:p-5">
        <div className="mb-2 flex items-center gap-2">
          <ModeBadge mode={message.mode} />
          <span className="text-xs font-semibold uppercase tracking-wide text-rose-300">
            Request failed
          </span>
        </div>
        <p className="text-sm text-rose-100/90">{message.message}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-slate-400">
            Query: <span className="text-slate-200">{message.query}</span>
          </p>
          <button
            type="button"
            onClick={() => onRetry(message)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-white/20 hover:bg-white/10"
          >
            <RotateCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
