import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { postAgent, postSearch } from '@/services/api';
import { ApiError } from '@/services/http';
import { createId, useChat } from '@/state/ChatContext';
import type { AgentResponse, QueryMode, SearchResponse } from '@/types/api';

interface SendArgs {
  mode: QueryMode;
  query: string;
  limit: number;
}

export function useQueryMode() {
  const { pushMessage, replaceMessage } = useChat();

  const agentMutation = useMutation<AgentResponse, ApiError, { query: string; limit: number }>({
    mutationFn: ({ query, limit }) => postAgent({ query, limit }),
  });

  const searchMutation = useMutation<SearchResponse, ApiError, { query: string; limit: number }>({
    mutationFn: ({ query, limit }) => postSearch({ query, limit, filter: null }),
  });

  const send = useCallback(
    async ({ mode, query, limit }: SendArgs) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      const now = Date.now();
      const userId = createId();
      const pendingId = createId();

      pushMessage({
        id: userId,
        role: 'user',
        mode,
        query: trimmed,
        limit,
        createdAt: now,
      });

      pushMessage({
        id: pendingId,
        role: 'pending',
        mode,
        createdAt: now,
      });

      try {
        if (mode === 'agent') {
          const data = await agentMutation.mutateAsync({ query: trimmed, limit });
          replaceMessage(pendingId, {
            id: pendingId,
            role: 'assistant',
            mode: 'agent',
            data,
            createdAt: Date.now(),
          });
        } else {
          const data = await searchMutation.mutateAsync({ query: trimmed, limit });
          replaceMessage(pendingId, {
            id: pendingId,
            role: 'assistant',
            mode: 'search',
            data,
            createdAt: Date.now(),
          });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unexpected error';
        replaceMessage(pendingId, {
          id: pendingId,
          role: 'error',
          mode,
          message,
          query: trimmed,
          limit,
          createdAt: Date.now(),
        });
      }
    },
    [agentMutation, searchMutation, pushMessage, replaceMessage],
  );

  const isPending = agentMutation.isPending || searchMutation.isPending;

  return { send, isPending };
}
