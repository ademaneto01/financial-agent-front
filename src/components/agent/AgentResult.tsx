import { FinalRecommendationCard } from './FinalRecommendationCard';
import { FundamentalSection } from './FundamentalSection';
import { MomentumSection } from './MomentumSection';
import { SentimentSection } from './SentimentSection';
import { TickerHeader } from './TickerHeader';
import type { AgentResponse } from '@/types/api';

interface AgentResultProps {
  data: AgentResponse;
}

export function AgentResult({ data }: AgentResultProps) {
  return (
    <div className="flex flex-col gap-4">
      <TickerHeader
        ticker={data.ticker}
        query={data.query}
        recommendation={data.final_recommendation}
      />
      <FinalRecommendationCard recommendation={data.final_recommendation} />
      <FundamentalSection analysis={data.fundamental_analysis} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MomentumSection analysis={data.momentum_analysis} />
        <SentimentSection analysis={data.sentiment_analysis} />
      </div>
    </div>
  );
}
