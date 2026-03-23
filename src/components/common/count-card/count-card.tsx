import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CountCardProps {
  count: number;
  title: string;
  className?: string;
  countClassName?: string;
}

export function CountCard({ count, title, className, countClassName }: CountCardProps) {
  return (
    <Card className={cn('i flex h-20 w-90 flex-col gap-1 text-center ring-0', className)}>
      <CardHeader>
        <CardTitle>
          <p className={cn('text-sm', countClassName)}>{count}</p>
        </CardTitle>
      </CardHeader>
      {title && (
        <CardContent>
          <p className="text-sosoeat-gray-600 text-xs">{title}</p>
        </CardContent>
      )}
    </Card>
  );
}
