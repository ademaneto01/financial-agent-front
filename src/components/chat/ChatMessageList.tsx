import { useEffect, useRef } from 'react';
import { AssistantMessage } from './AssistantMessage';
import { EmptyState } from './EmptyState';
import { ErrorBubble } from './ErrorBubble';
import { LoadingBubble } from './LoadingBubble';
import { UserMessage } from './UserMessage';
import { useQueryMode } from '@/hooks/useQueryMode';
import { useChat } from '@/state/ChatContext';
import type { ChatMessage, ErrorMessage, QueryMode } from '@/types/api';

interface ChatMessageListProps {
  onPickSuggestion: (value: string, mode: QueryMode) => void;
}

export function ChatMessageList({ onPickSuggestion }: ChatMessageListProps) {
  const { messages, setMode } = useChat();
  const { send } = useQueryMode();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const handleRetry = async (msg: ErrorMessage) => {
    await send({ mode: msg.mode, query: msg.query, limit: msg.limit });
  };

  if (messages.length === 0) {
    return (
      <div className="flex min-h-full items-center justify-center px-4">
        <EmptyState
          onPick={(s) => {
            setMode(s.mode);
            onPickSuggestion(s.query, s.mode);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-3 py-6 md:px-6">
      {messages.map((message) => (
        <MessageRouter key={message.id} message={message} onRetry={handleRetry} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageRouter({
  message,
  onRetry,
}: {
  message: ChatMessage;
  onRetry: (msg: ErrorMessage) => void;
}) {
  switch (message.role) {
    case 'user':
      return <UserMessage message={message} />;
    case 'assistant':
      return <AssistantMessage message={message} />;
    case 'pending':
      return <LoadingBubble mode={message.mode} />;
    case 'error':
      return <ErrorBubble message={message} onRetry={onRetry} />;
  }
}
