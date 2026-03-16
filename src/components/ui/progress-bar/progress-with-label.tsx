import { Users } from 'lucide-react';

import { Field, FieldLabel } from '@/components/ui/field';

import { Progress } from './progress';
import { ProgressProps } from './progress.type';

type ProgressWithLabelProps = {
  current: number;
  max: number;
  variant: ProgressProps['variant'];
};

export function ProgressWithLabel({ current, max, variant }: ProgressWithLabelProps) {
  const progress = (current / max) * 100;
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span className="flex items-center justify-center gap-1">
          {' '}
          <Users />
          <span className="ml-auto">
            {current} / {max}
          </span>
          <span>참여중</span>
        </span>
      </FieldLabel>
      <Progress value={progress} variant={variant} id="progress-upload" />
    </Field>
  );
}
