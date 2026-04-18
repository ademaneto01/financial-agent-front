import { ArrowDownRight, ArrowUpRight, Minus, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/cn';
import { actionColor } from '@/lib/format';
import type { FinalAction, Recommendation } from '@/types/api';

type AnyAction = FinalAction | Uppercase<Recommendation>;

interface ActionBadgeProps {
  action: AnyAction;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Icon({ action, className }: { action: AnyAction; className?: string }) {
  switch (action) {
    case 'BUY':
      return <ArrowUpRight className={className} strokeWidth={2.5} />;
    case 'SELL':
      return <ArrowDownRight className={className} strokeWidth={2.5} />;
    case 'HOLD':
      return <Minus className={className} strokeWidth={2.5} />;
    case 'AVOID':
      return <ShieldAlert className={className} strokeWidth={2.5} />;
    default:
      return null;
  }
}

export function ActionBadge({ action, size = 'md', className }: ActionBadgeProps) {
  const sizeCls =
    size === 'lg'
      ? 'px-4 py-2 text-base'
      : size === 'sm'
        ? 'px-2 py-0.5 text-[11px]'
        : 'px-3 py-1 text-sm';
  const iconSize = size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wide',
        sizeCls,
        actionColor(action),
        className,
      )}
    >
      <Icon action={action} className={iconSize} />
      {action}
    </span>
  );
}
