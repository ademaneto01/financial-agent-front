import { LineChart, Trash2 } from 'lucide-react';
import { useChat } from '@/state/ChatContext';

export function ChatHeader() {
  const { messages, clearMessages } = useChat();

  return (
    <header className="glass sticky top-0 z-10 flex items-center justify-between gap-3 border-b px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-200">
          <LineChart className="h-4 w-4" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-sm font-bold tracking-tight text-white">Financial Agent</h1>
          <span className="text-[11px] text-slate-400">
            Investment analysis &amp; knowledge search
          </span>
        </div>
      </div>

      {messages.length > 0 && (
        <button
          type="button"
          onClick={clearMessages}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear
        </button>
      )}
    </header>
  );
}
