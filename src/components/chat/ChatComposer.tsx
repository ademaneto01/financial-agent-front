import { SendHorizonal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ModeSelect } from './ModeSelect';
import { cn } from '@/lib/cn';
import { useQueryMode } from '@/hooks/useQueryMode';
import { useChat } from '@/state/ChatContext';

interface ChatComposerProps {
  initialValue?: string;
}

export function ChatComposer({ initialValue = '' }: ChatComposerProps) {
  const { mode, limit, setMode, setLimit } = useChat();
  const { send, isPending } = useQueryMode();
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const canSubmit = value.trim().length > 0 && !isPending;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const query = value;
    setValue('');
    await send({ mode, query, limit });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
      className="card flex flex-col gap-2 p-3 md:p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <ModeSelect mode={mode} onChange={setMode} disabled={isPending} />
        <label className="flex items-center gap-2 text-xs text-slate-400">
          <span>Limit</span>
          <input
            type="number"
            min={1}
            max={20}
            value={limit}
            disabled={isPending}
            onChange={(e) => setLimit(Number(e.target.value) || 1)}
            className="w-16 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-center text-slate-100 outline-none focus:border-indigo-400/50"
          />
        </label>
      </div>

      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          rows={1}
          placeholder={
            mode === 'agent'
              ? 'Ask for an analysis, e.g. “Should I invest in AAPL right now?”'
              : 'Search the knowledge base, e.g. “AAPL earnings risks”'
          }
          className="min-h-[44px] w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm leading-relaxed text-slate-100 placeholder:text-slate-500 focus:border-indigo-400/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          aria-label="Send"
          className={cn(
            'flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl border transition',
            canSubmit
              ? 'border-indigo-400/40 bg-indigo-500/20 text-indigo-100 hover:bg-indigo-500/30'
              : 'cursor-not-allowed border-white/10 bg-white/5 text-slate-500',
          )}
        >
          <SendHorizonal className="h-4 w-4" />
        </button>
      </div>

      <p className="pl-1 text-[11px] text-slate-500">
        Press <kbd className="rounded bg-white/10 px-1 text-slate-300">Enter</kbd> to send,{' '}
        <kbd className="rounded bg-white/10 px-1 text-slate-300">Shift+Enter</kbd> for newline
      </p>
    </form>
  );
}
