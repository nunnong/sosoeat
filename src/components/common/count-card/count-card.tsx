import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { CountCardProps } from './count-card.types';
import { cardVariants, countVariants } from './count-card.variants';

export function CountCard({ count, title, variant, className }: CountCardProps) {
  return (
    <Card className={cn(cardVariants({ variant }), className)}>
      <CardHeader>
        <CardTitle>
          <p className={cn(countVariants({ variant }))}>{count}</p>
        </CardTitle>
      </CardHeader>
      {title && (
        <CardContent>
          <p className="text-sosoeat-gray-600 text-[11px]">{title}</p>
        </CardContent>
      )}
    </Card>
  );
}
