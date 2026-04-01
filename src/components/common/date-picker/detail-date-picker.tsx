'use client';

import { useState } from 'react';
import { ko } from 'react-day-picker/locale';

import Image from 'next/image';

import { format, isSameDay, startOfDay } from 'date-fns';
import { ChevronDown, Triangle } from 'lucide-react';

import type { DetailDatePickerProps } from '@/components/common/date-picker/detail-date-picker.type';
import { Button } from '@/components/ui/button/button';
import { Calendar } from '@/components/ui/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/popover';
import { cn } from '@/lib/utils';

const variantStyles: Record<
  NonNullable<DetailDatePickerProps['variant']>,
  {
    calendarSelected: string;
    resetButton: string;
    applyButton: string;
  }
> = {
  groupEat: {
    calendarSelected:
      '[&_button[data-range-start=true][data-range-end=true]]:!rounded-[var(--radius-md)] [&_button[data-range-start=true][data-range-end=true]]:!bg-sosoeat-orange-500 [&_button[data-range-start=true][data-range-end=true]]:!text-white [&_button[data-range-start=true]:not([data-range-end=true])]:!bg-sosoeat-orange-500 [&_button[data-range-start=true]:not([data-range-end=true])]:!text-white [&_button[data-range-end=true]:not([data-range-start=true])]:!bg-sosoeat-orange-500 [&_button[data-range-end=true]:not([data-range-start=true])]:!text-white [&_button[data-range-middle=true]]:!bg-sosoeat-orange-100 [&_button[data-range-middle=true]]:!text-sosoeat-orange-900',
    resetButton:
      'bg-white border border-sosoeat-orange-600 text-sosoeat-orange-700 rounded-xl hover:bg-sosoeat-orange-50',
    applyButton: 'bg-sosoeat-orange-600 text-white rounded-xl hover:bg-sosoeat-orange-700',
  },
  groupBuy: {
    calendarSelected:
      '[&_button[data-range-start=true][data-range-end=true]]:!rounded-[var(--radius-md)] [&_button[data-range-start=true][data-range-end=true]]:!bg-sosoeat-blue-500 [&_button[data-range-start=true][data-range-end=true]]:!text-white [&_button[data-range-start=true]:not([data-range-end=true])]:!bg-sosoeat-blue-500 [&_button[data-range-start=true]:not([data-range-end=true])]:!text-white [&_button[data-range-end=true]:not([data-range-start=true])]:!bg-sosoeat-blue-500 [&_button[data-range-end=true]:not([data-range-start=true])]:!text-white [&_button[data-range-middle=true]]:!bg-sosoeat-blue-100 [&_button[data-range-middle=true]]:!text-sosoeat-blue-900',
    resetButton:
      'bg-white border border-sosoeat-blue-500 text-sosoeat-blue-600 rounded-xl hover:bg-sosoeat-blue-50',
    applyButton: 'bg-sosoeat-blue-500 text-white rounded-xl hover:bg-sosoeat-blue-600',
  },
};

function formatTriggerLabel({
  valueStart,
  valueEnd,
}: {
  valueStart: Date | null;
  valueEnd: Date | null;
}): string {
  if (!valueStart && !valueEnd) return '날짜 전체';
  if (valueStart && !valueEnd) return format(valueStart, 'M.dd EEE', { locale: ko });
  if (!valueStart && valueEnd) return format(valueEnd, 'M.dd EEE', { locale: ko });
  if (valueStart && valueEnd && isSameDay(valueStart, valueEnd))
    return format(valueStart, 'M.dd EEE', { locale: ko });
  return `${format(valueStart!, 'M.dd EEE', { locale: ko })} - ${format(valueEnd!, 'M.dd EEE', { locale: ko })}`;
}

export function DetailDatePicker({
  variant = 'groupEat',
  valueStart,
  valueEnd,
  onDateChange = () => {},
  className,
}: DetailDatePickerProps) {
  const styles = variantStyles[variant];

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<{
    valueStart: Date | undefined;
    valueEnd: Date | undefined;
  }>();

  const handleReset = () => {
    setDraft({ valueStart: undefined, valueEnd: undefined });
    onDateChange({ valueStart: null, valueEnd: null });
  };

  const handleApply = () => {
    if (!draft?.valueStart && !draft?.valueEnd) {
      onDateChange({ valueStart: null, valueEnd: null });
      setOpen(false);
      return;
    }

    onDateChange({ valueStart: draft.valueStart ?? null, valueEnd: draft.valueEnd ?? null });
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen)
      setDraft({
        valueStart: valueStart ?? undefined,
        valueEnd: valueEnd ?? undefined,
      });
  };

  const triggerLabel = formatTriggerLabel({ valueStart, valueEnd });
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger type="button" className={cn('min-w-[170px]', className)}>
        <span className="flex min-w-[93px] items-center justify-end gap-1 text-base font-medium">
          <Image src={'icons/deadline-calendar.svg'} alt="Calendar" width={20} height={20} />
          {triggerLabel}
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[298px] p-4">
        <Calendar
          locale={ko}
          mode="range"
          disabled={{ before: startOfDay(new Date()) }}
          selected={draft?.valueStart ? { from: draft.valueStart, to: draft.valueEnd } : undefined}
          onSelect={(d) =>
            setDraft({
              valueStart: d?.from,
              valueEnd: d?.to,
            })
          }
          className={cn(
            'w-[250px] text-sm font-semibold [&_button]:focus-visible:!border-transparent [&_button]:focus-visible:!ring-0 [&_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:hover:!bg-transparent [&_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:active:!bg-transparent [&_button[data-range-end=true]:not([data-range-start=true])]:!rounded-l-none [&_button[data-range-middle=true]]:!rounded-none [&_button[data-range-start=true]:not([data-range-end=true])]:!rounded-r-none [&_td[data-focused=true]_button]:!border-transparent [&_td[data-focused=true]_button]:!ring-0 [&_td[data-focused=true]_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:!bg-transparent [&_td[data-today=true]]:!bg-transparent [&_td[data-today=true]_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:!bg-transparent',
            styles.calendarSelected
          )}
          buttonVariant={'ghost'}
          components={{
            Chevron: ({ orientation, className, ...props }) =>
              orientation === 'left' ? (
                <Triangle
                  className={cn('text-foreground h-[7px] w-[15px]', className)}
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ transform: 'rotate(-90deg)' }}
                  {...props}
                />
              ) : (
                <Triangle
                  className={cn('text-foreground h-[7px] w-[15px]', className)}
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ transform: 'rotate(90deg)' }}
                  {...props}
                />
              ),
          }}
        />
        <div className="flex w-full justify-center gap-2">
          <Button
            variant="outline"
            className={cn('h-10 w-[118px] text-sm font-semibold', styles.resetButton)}
            onClick={handleReset}
            type="button"
          >
            초기화
          </Button>
          <Button
            className={cn('h-10 w-[118px] text-sm font-semibold', styles.applyButton)}
            onClick={handleApply}
            type="button"
          >
            적용
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
