import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type { ChatMessage, QueryMode } from '@/types/api';

interface ChatState {
  messages: ChatMessage[];
  mode: QueryMode;
  limit: number;
}

type Action =
  | { type: 'push'; message: ChatMessage }
  | { type: 'replace'; id: string; message: ChatMessage }
  | { type: 'remove'; id: string }
  | { type: 'clear' }
  | { type: 'setMode'; mode: QueryMode }
  | { type: 'setLimit'; limit: number };

const initialState: ChatState = {
  messages: [],
  mode: 'agent',
  limit: 3,
};

function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case 'push':
      return { ...state, messages: [...state.messages, action.message] };
    case 'replace':
      return {
        ...state,
        messages: state.messages.map((m) => (m.id === action.id ? action.message : m)),
      };
    case 'remove':
      return { ...state, messages: state.messages.filter((m) => m.id !== action.id) };
    case 'clear':
      return { ...state, messages: [] };
    case 'setMode':
      return { ...state, mode: action.mode };
    case 'setLimit':
      return { ...state, limit: Math.max(1, Math.min(20, action.limit)) };
    default:
      return state;
  }
}

interface ChatContextValue extends ChatState {
  pushMessage: (message: ChatMessage) => void;
  replaceMessage: (id: string, message: ChatMessage) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
  setMode: (mode: QueryMode) => void;
  setLimit: (limit: number) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const pushMessage = useCallback((message: ChatMessage) => {
    dispatch({ type: 'push', message });
  }, []);

  const replaceMessage = useCallback((id: string, message: ChatMessage) => {
    dispatch({ type: 'replace', id, message });
  }, []);

  const removeMessage = useCallback((id: string) => {
    dispatch({ type: 'remove', id });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []);

  const setMode = useCallback((mode: QueryMode) => {
    dispatch({ type: 'setMode', mode });
  }, []);

  const setLimit = useCallback((limit: number) => {
    dispatch({ type: 'setLimit', limit });
  }, []);

  const value = useMemo<ChatContextValue>(
    () => ({
      ...state,
      pushMessage,
      replaceMessage,
      removeMessage,
      clearMessages,
      setMode,
      setLimit,
    }),
    [state, pushMessage, replaceMessage, removeMessage, clearMessages, setMode, setLimit],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within <ChatProvider>');
  return ctx;
}

/** Unique id generator for chat messages. */
export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
