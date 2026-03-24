import { VariantProps } from 'class-variance-authority';

import { cardVariants } from './count-card.variants';

export interface CountCardProps extends VariantProps<typeof cardVariants> {
  count: number;
  title: string;
  className?: string;
}
