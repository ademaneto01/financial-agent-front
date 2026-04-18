export type QueryMode = 'agent' | 'search';

// ---------------------------------------------------------------------------
// Request payloads
// ---------------------------------------------------------------------------

export interface AgentRequest {
  query: string;
  limit: number;
}

export interface SearchRequest {
  query: string;
  limit: number;
  filter: Record<string, unknown> | null;
}

// ---------------------------------------------------------------------------
// Agent response enums
// ---------------------------------------------------------------------------

export type InvestmentGrade = 'A' | 'B' | 'C' | 'D';
export type Recommendation = 'buy' | 'hold' | 'sell' | 'avoid';
export type MomentumDir = 'positive' | 'neutral' | 'negative';
export type MomentumStrength = 'strong' | 'moderate' | 'weak';
export type Outlook = 'bullish' | 'neutral' | 'bearish';
export type SentimentDir = 'Positive' | 'Neutral' | 'Negative';
export type FinalAction = 'BUY' | 'HOLD' | 'SELL';
export type TimeHorizon = 'Short-term' | 'Medium-term' | 'Long-term';

// ---------------------------------------------------------------------------
// Agent response structure
// ---------------------------------------------------------------------------

export interface FundamentalAnalysis {
  overall_investment_thesis: string;
  investment_grade: InvestmentGrade;
  confidence_score: number;
  key_strengths: string[];
  key_concerns: string[];
  recommendation: Recommendation;
}

export interface MomentumAnalysis {
  overall_momentum: MomentumDir;
  momentum_strength: MomentumStrength;
  key_momentum_drivers: string[];
  momentum_risks: string[];
  short_term_outlook: Outlook;
  momentum_score: number;
}

export interface SentimentAnalysis {
  sentiment_score: number;
  sentiment_direction: SentimentDir;
  key_news_themes: string[];
  recent_catalysts: string[];
  market_outlook: string;
}

export interface FinalRecommendation {
  action: FinalAction;
  confidence: number;
  rationale: string;
  key_risks: string[];
  key_opportunities: string[];
  time_horizon: TimeHorizon;
}

export interface AgentResponse {
  query: string;
  ticker: string;
  fundamental_analysis: FundamentalAnalysis;
  momentum_analysis: MomentumAnalysis;
  sentiment_analysis: SentimentAnalysis;
  final_recommendation: FinalRecommendation;
}

// ---------------------------------------------------------------------------
// Search response structure
// ---------------------------------------------------------------------------

export interface SearchHit {
  score: number;
  text: string;
  metadata: Record<string, unknown>;
}

export interface SearchResponse {
  results: SearchHit[];
}

// ---------------------------------------------------------------------------
// Chat domain (discriminated union)
// ---------------------------------------------------------------------------

export interface UserMessage {
  id: string;
  role: 'user';
  mode: QueryMode;
  query: string;
  limit: number;
  createdAt: number;
}

export interface AssistantAgentMessage {
  id: string;
  role: 'assistant';
  mode: 'agent';
  data: AgentResponse;
  createdAt: number;
}

export interface AssistantSearchMessage {
  id: string;
  role: 'assistant';
  mode: 'search';
  data: SearchResponse;
  createdAt: number;
}

export interface PendingMessage {
  id: string;
  role: 'pending';
  mode: QueryMode;
  createdAt: number;
}

export interface ErrorMessage {
  id: string;
  role: 'error';
  mode: QueryMode;
  message: string;
  /** Original query that failed, useful for retry. */
  query: string;
  limit: number;
  createdAt: number;
}

export type ChatMessage =
  | UserMessage
  | AssistantAgentMessage
  | AssistantSearchMessage
  | PendingMessage
  | ErrorMessage;
