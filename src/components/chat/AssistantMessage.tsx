import { Bot } from 'lucide-react';
import { ModeBadge } from './ModeBadge';
import { AgentResult } from '@/components/agent/AgentResult';
import { SearchResult } from '@/components/search/SearchResult';
import { formatTime } from '@/lib/format';
import type { AssistantAgentMessage, AssistantSearchMessage } from '@/types/api';

interface AssistantMessageProps {
  message: AssistantAgentMessage | AssistantSearchMessage;
}

export function AssistantMessage({ message }: AssistantMessageProps) {
  return (
    <div className="flex w-full animate-fade-in gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500/20 to-purple-500/10">
        <Bot className="h-4 w-4 text-indigo-300" />
      </div>
      <div className="card min-w-0 flex-1 p-4 md:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <ModeBadge mode={message.mode} />
          <span className="text-xs text-slate-500">{formatTime(message.createdAt)}</span>
        </div>
        {message.mode === 'agent' ? (
          <AgentResult data={message.data} />
        ) : (
          <SearchResult data={message.data} />
        )}
      </div>
    </div>
  );
}
