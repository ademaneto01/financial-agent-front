import { User } from 'lucide-react';
import { ModeBadge } from './ModeBadge';
import { formatTime } from '@/lib/format';
import type { UserMessage as UserMessageType } from '@/types/api';

interface UserMessageProps {
  message: UserMessageType;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex w-full animate-fade-in justify-end gap-3">
      <div className="flex max-w-[85%] flex-col items-end gap-1">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ModeBadge mode={message.mode} />
          <span className="text-slate-500">limit: {message.limit}</span>
          <span className="text-slate-500">•</span>
          <span>{formatTime(message.createdAt)}</span>
        </div>
        <div className="rounded-2xl rounded-tr-sm border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 px-4 py-2.5 text-sm leading-relaxed text-slate-50 shadow-glow">
          {message.query}
        </div>
      </div>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <User className="h-4 w-4 text-slate-300" />
      </div>
    </div>
  );
}
