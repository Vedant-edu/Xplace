import { cn } from '@/lib/utils';

interface StudentRingProps {
  count: number;
  total: number;
  label: string;
  className?: string;
}

export function StudentRing({ count, total, label, className }: StudentRingProps) {
  const percentage = (count / total) * 100;
  
  return (
    <div 
      className={cn("student-ring w-32 h-32", className)}
      style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
    >
      <div className="student-ring-content">
        <span className="text-3xl font-bold">{count}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}