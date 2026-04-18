import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface KeyValueProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function KeyValue({ label, value, className }: KeyValueProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className="text-sm text-slate-100">{value}</span>
    </div>
  );
}
