'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
  MapPinIcon,
  UsersIcon,
} from 'lucide-react';

import {
  DateBadge,
  TimeBadge,
} from '@/app/meetings/[id]/_components/meeting-detail-card/date-badge';
import { DeadlineBadge } from '@/components/common/deadline-badge';
import { HeartButton } from '@/components/common/heart-button';
import { ProgressWithLabel } from '@/components/common/progress-with-label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';
import type { MeetingCategory } from '@/types/meeting';

import {
  actionButtonVariants,
  CATEGORY_LABEL,
  iconBgVariants,
  iconColorVariants,
  outlineButtonVariants,
} from './meeting-detail-card.constants';
import type { MeetingDetailCardProps } from './meeting-detail-card.types';

// ─────────────────────────────────────────────────────────────
// 서브 컴포넌트
// ─────────────────────────────────────────────────────────────

// ── InfoRow ───────────────────────────────────────────────────

interface InfoRowProps {
  icon: React.ReactNode;
  /** iconBgClass/iconColorClass 대신 category 하나로 색상 파생 */
  category: MeetingCategory;
  label: string;
  children: React.ReactNode;
  className?: string;
}

function InfoRow({ icon, category, label, children, className }: InfoRowProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          iconBgVariants({ category })
        )}
      >
        <div className={cn('h-4 w-4 [&>svg]:h-4 [&>svg]:w-4', iconColorVariants({ category }))}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sosoeat-gray-600 text-xs font-semibold">{label}</p>
        {children}
      </div>
    </div>
  );
}

// ── ParticipantsRow ───────────────────────────────────────────

interface ParticipantsRowProps {
  meetingId: string;
  current: number;
  max: number;
  category: MeetingCategory;
  className?: string;
}

function ParticipantsRow({ meetingId, current, max, category, className }: ParticipantsRowProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="bg-sosoeat-gray-100 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
        <UsersIcon className="text-sosoeat-gray-700 h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sosoeat-gray-600 mb-1 text-xs font-semibold lg:text-sm">참여 현황</p>
        <ProgressWithLabel
          id={`meeting-${meetingId}-progress`}
          current={current}
          max={max}
          variant={category}
        />
      </div>
    </div>
  );
}

// ── HostRow ───────────────────────────────────────────────────

interface HostRowProps {
  name: string;
  profileImage?: string;
  className?: string;
}

function HostRow({ name, profileImage, className }: HostRowProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar size="default">
        <AvatarImage src={profileImage} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sosoeat-gray-600 text-xs font-semibold">호스트</p>
        <p className="text-xs font-bold">{name}</p>
      </div>
    </div>
  );
}

// ── ActionRow ─────────────────────────────────────────────────

interface ActionRowProps {
  layout: 'mobile' | 'tablet' | 'pc';
  actionButton: React.ReactNode;
  isLiked: boolean;
  onLikeToggle: () => void;
}

function ActionRow({ layout, actionButton, isLiked, onLikeToggle }: ActionRowProps) {
  const outerClass = cn('flex items-center gap-[10px]', {
    'pt-[14px]': layout === 'mobile',
    'pt-[12px]': layout === 'tablet',
    'gap-2 pt-[10px]': layout === 'pc',
  });

  const wrapperClass = cn('flex-1', {
    'h-[40px]': layout !== 'pc',
    'h-[60px]': layout === 'pc',
  });

  return (
    <div className={outerClass}>
      <div className={wrapperClass}>{actionButton}</div>
      <HeartButton
        isLiked={isLiked}
        onToggle={onLikeToggle}
        className={cn('border-sosoeat-gray-500 relative inset-auto m-0', {
          'h-[40px] w-[40px]': layout !== 'pc',
          'h-[60px] w-[60px]': layout === 'pc',
        })}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────────────────────

export function MeetingDetailCard(props: MeetingDetailCardProps) {
  const { meeting, status, isLiked, onLikeToggle } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  // ── 색상 파생의 단일 출처 ──────────────────────────────────
  const category = meeting.type;
  const categoryLabel = CATEGORY_LABEL[category];

  // ── 날짜 포맷 ─────────────────────────────────────────────
  const date = new Date(meeting.dateTime);
  const fullDateLabel = format(date, 'yyyy년 M월 d일 EEEE · HH:mm', { locale: ko });

  // ── 액션 버튼 ─────────────────────────────────────────────
  const actionButton = (() => {
    if (status === 'closed') {
      return (
        <Button className="h-full w-full rounded-2xl" disabled>
          마감된 모임
        </Button>
      );
    }

    if (props.role === 'host') {
      if (status === 'confirmed') {
        return (
          <Button
            variant="ghost"
            className={outlineButtonVariants({ category })}
            onClick={props.onShare}
          >
            공유하기
          </Button>
        );
      }
      return (
        <Button
          variant="ghost"
          className={actionButtonVariants({ category })}
          onClick={props.onConfirm}
        >
          모임 확정하기
        </Button>
      );
    }

    if (props.role === 'participant' && props.isJoined) {
      return (
        <Button
          variant="ghost"
          className={outlineButtonVariants({ category })}
          onClick={props.onCancel}
        >
          참여 취소하기
        </Button>
      );
    }

    return (
      <Button
        variant="ghost"
        className={cn(actionButtonVariants({ category }))}
        onClick={props.onJoin}
      >
        참여하기
      </Button>
    );
  })();

  // ── 호스트 더보기 메뉴 ────────────────────────────────────
  const ellipsisMenu =
    props.role === 'host' ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="더보기">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={props.onEdit}>수정하기</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={props.onDelete}>
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null;

  const likeToggle = onLikeToggle ?? (() => {});

  return (
    <div
      className={cn(
        'relative transition-all duration-300',
        'border-sosoeat-gray-300 rounded-2xl border bg-white px-6 shadow-sm',
        'pt-[16px] pb-[40px] md:px-[16px] md:py-[14px] lg:px-6 lg:pt-[10px] lg:pb-[16px]',
        'md:w-[358px] md:overflow-hidden lg:h-[460px] lg:w-[616px] lg:overflow-hidden',
        'w-[343px]',
        isExpanded && 'max-md:rounded-b-none'
      )}
    >
      {/* ════════════════════════════════════════
          모바일 (~md)
          핵심: 상단은 항상 고정, 확장 영역만 max-height 트랜지션
          ════════════════════════════════════════ */}
      <div className="flex flex-col md:hidden">
        {/* 상단 고정 영역 — 펼치기 여부와 무관하게 항상 표시 */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DateBadge date={meeting.dateTime} category={category} />
              <TimeBadge date={meeting.dateTime} />
            </div>
            {ellipsisMenu}
          </div>

          <h2 className="mt-3 text-lg leading-snug font-semibold">{meeting.name}</h2>

          <div className="mt-2 flex items-center gap-1">
            <MapPinIcon className="text-sosoeat-gray-500 h-4 w-4 shrink-0" />
            <span className="text-sosoeat-gray-500 text-sm font-medium">
              {meeting.region} · {categoryLabel}
            </span>
          </div>
        </div>

        {/* 항상 고정 — 액션 버튼 + 하트 */}
        <ActionRow
          layout="mobile"
          actionButton={actionButton}
          isLiked={isLiked}
          onLikeToggle={likeToggle}
        />

        {/* 항상 고정 — chevron */}
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            aria-label={isExpanded ? '접기' : '펼치기'}
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-sosoeat-gray-400"
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* 하단 확장 영역 — max-height 트랜지션으로 상단 영역이 움직이지 않음 */}
        <div
          className={cn(
            'absolute top-full right-0 left-0 z-10',
            'rounded-b-2xl bg-white px-6', // border 제거 — 카드 shadow로 이어보이게
            'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),4px_0_6px_-1px_rgba(0,0,0,0.05),-4px_0_6px_-1px_rgba(0,0,0,0.05)]',
            'overflow-hidden transition-all duration-300 ease-in-out',
            isExpanded ? 'max-h-[200px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
          )}
        >
          <div className="flex flex-col gap-4">
            <ParticipantsRow
              meetingId={String(meeting.id)}
              current={meeting.participantCount}
              max={meeting.capacity}
              category={category}
            />
            <HostRow name={meeting.host.name} profileImage={meeting.host.profileImage} />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          태블릿 (md ~ lg)
          ════════════════════════════════════════ */}
      <div className="hidden md:flex md:flex-col lg:hidden">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <DeadlineBadge registrationEnd={meeting.registrationEnd} variant={category} />
            {ellipsisMenu}
          </div>

          <h2 className="line-clamp-2 text-xl leading-snug font-semibold">{meeting.name}</h2>

          <InfoRow
            icon={<CalendarIcon />}
            category={category}
            className="text-sosoeat-gray-600 text-xs font-semibold"
            label="날짜 및 시간"
          >
            <p className="text-sosoeat-gray-900 text-xs font-bold">{fullDateLabel}</p>
          </InfoRow>

          <InfoRow
            icon={<MapPinIcon />}
            category={category}
            className="text-sosoeat-gray-600 text-xs font-semibold"
            label="장소"
          >
            <p className="text-sosoeat-gray-900 text-xs font-bold">{meeting.region}</p>
            <p className="text-sosoeat-gray-600 text-xs font-bold">{meeting.address}</p>
          </InfoRow>

          <ParticipantsRow
            meetingId={String(meeting.id)}
            current={meeting.participantCount}
            max={meeting.capacity}
            category={category}
          />

          <HostRow name={meeting.host.name} profileImage={meeting.host.profileImage} />
        </div>

        <ActionRow
          layout="tablet"
          actionButton={actionButton}
          isLiked={isLiked}
          onLikeToggle={likeToggle}
        />
      </div>

      {/* ════════════════════════════════════════
          PC (lg ~)
          ════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:h-full lg:flex-col">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-[14px]">
            <div className="flex items-center justify-between">
              <DeadlineBadge registrationEnd={meeting.registrationEnd} variant={category} />
              {ellipsisMenu}
            </div>

            <h2 className="text-3xl leading-snug font-bold">{meeting.name}</h2>

            <InfoRow
              icon={<CalendarIcon />}
              category={category}
              className="text-sosoeat-gray-600 text-sm font-semibold"
              label="날짜 및 시간"
            >
              <p className="text-sosoeat-gray-900 text-sm font-bold">{fullDateLabel}</p>
            </InfoRow>

            <InfoRow
              icon={<MapPinIcon />}
              category={category}
              className="text-sosoeat-gray-600 text-sm font-semibold"
              label="장소"
            >
              <p className="text-sosoeat-gray-900 text-sm font-bold">{meeting.region}</p>
              <p className="text-sosoeat-gray-600 text-sm font-semibold">{meeting.address}</p>
            </InfoRow>

            <ParticipantsRow
              meetingId={String(meeting.id)}
              current={meeting.participantCount}
              max={meeting.capacity}
              category={category}
            />

            <HostRow name={meeting.host.name} profileImage={meeting.host.profileImage} />
          </div>

          <ActionRow
            layout="pc"
            actionButton={actionButton}
            isLiked={isLiked}
            onLikeToggle={likeToggle}
          />
        </div>
      </div>
    </div>
  );
}
