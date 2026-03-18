'use client';

import * as React from 'react';

import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';
import type { GroupTypeProps } from '@/types/group-type.type';
import { variantStyles,variantStylesFull } from '@/types/group-type.type';

function Progress({ className, value, variant, ...props }: GroupTypeProps) {
  const isFull = (value ?? 0) >= 100;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        'bg-muted relative flex h-2 w-[328px] items-center overflow-x-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          `size-full flex-1 transition-all`,
          isFull ? variantStylesFull[variant] : variantStyles[variant]
        )}
        style={{ transform: `translateX(-${100 - Math.max(0, Math.min(100, value ?? 0))}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
