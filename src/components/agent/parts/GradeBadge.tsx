import { cn } from '@/lib/cn';
import { gradeColor } from '@/lib/format';
import type { InvestmentGrade } from '@/types/api';

interface GradeBadgeProps {
  grade: InvestmentGrade;
  className?: string;
}

export function GradeBadge({ grade, className }: GradeBadgeProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-xl border text-lg font-bold shadow-inner',
        gradeColor(grade),
        className,
      )}
      aria-label={`Investment grade ${grade}`}
    >
      {grade}
    </div>
  );
}
