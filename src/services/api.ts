import { http } from './http';
import type {
  AgentRequest,
  AgentResponse,
  SearchRequest,
  SearchResponse,
} from '@/types/api';

export async function postAgent(body: AgentRequest): Promise<AgentResponse> {
  const { data } = await http.post<AgentResponse>('/agent', body);
  return data;
}

export async function postSearch(body: SearchRequest): Promise<SearchResponse> {
  const { data } = await http.post<SearchResponse>('/search', body);
  return data;
}
