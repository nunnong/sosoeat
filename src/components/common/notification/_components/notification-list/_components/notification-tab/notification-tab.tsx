'use client';

import { type ReactNode,useEffect, useState } from 'react';

import { Calendar, ClipboardList, MessageCircle, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { notificationsApi, postsApi } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import type {
  Notification,
  NotificationData,
  NotificationTypeEnum,
} from '@/types/generated-client';

import { formatNotificationMetaRelativeTime } from './format-notification-meta-time';

const notificationRowButtonClass =
  'h-auto w-full shrink-0 flex flex-col items-stretch justify-start gap-0 rounded-none border-0 p-0 text-left font-normal whitespace-normal shadow-none hover:bg-transparent';

const metaDot = (
  <span className="inline-block size-1 shrink-0 rounded-full bg-[#FF6600]" aria-hidden />
);

interface ReadCheckIconProps {
  className?: string;
}

const ReadCheckIcon = ({ className }: ReadCheckIconProps) => {
  return (
    <span
      className={cn(
        'inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#FF6600]',
        className
      )}
      aria-hidden
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

const iconBoxClass =
  'flex size-[42px] shrink-0 items-center justify-center rounded-[14px] px-[9.5px] text-white';

const UserIcon = () => (
  <div className={cn(iconBoxClass, 'bg-[#FF6F0F]')} aria-hidden>
    <Users className="size-[22px]" strokeWidth={2.5} aria-hidden />
  </div>
);

const MeetingIcon = () => (
  <div className={cn(iconBoxClass, 'bg-[#F5A623]')} aria-hidden>
    <Calendar className="size-[22px]" strokeWidth={1.1} aria-hidden />
  </div>
);

const CommentIcon = () => (
  <div className={cn(iconBoxClass, 'bg-[#00B493]')} aria-hidden>
    <MessageCircle className="size-[13px]" strokeWidth={1.1} aria-hidden />
  </div>
);

const ApprovedIcon = () => (
  <div className={cn(iconBoxClass, 'bg-[#F5A623]')} aria-hidden>
    <ClipboardList className="size-[22px]" strokeWidth={1.1} aria-hidden />
  </div>
);

interface NotificationTabBodyProps {
  thumbnail: ReactNode;
  title: string;
  isMeetingConfirmed: boolean;
  metaRight: string;
  description: string;
  highlighted: boolean;
}

const NotificationTabBody = ({
  thumbnail,
  title,
  isMeetingConfirmed,
  metaRight,
  description,
  highlighted,
}: NotificationTabBodyProps) => {
  return (
    <div
      className={cn(
        'flex min-h-[90px] w-[314px] shrink-0 flex-row items-start gap-4 pt-3 pr-7 pb-4 pl-5',
        highlighted ? 'bg-[#FFF2EC]' : 'bg-white'
      )}
    >
      <div className="shrink-0">{thumbnail}</div>
      <div className="flex w-52 min-w-0 shrink-0 flex-col items-stretch gap-1 self-stretch">
        <div className="flex min-h-4.5 shrink-0 flex-row items-center justify-between gap-0.5 self-stretch">
          <div className="flex min-w-0 flex-row items-center gap-0.5">
            <span className="text-xs leading-4 font-semibold text-[#333333]">{title}</span>
            {isMeetingConfirmed ? <ReadCheckIcon /> : null}
          </div>
          <div className="flex shrink-0 flex-row items-center justify-center gap-1">
            {metaDot}
            <span className="text-xs leading-4 font-normal text-[#BBBBBB]">{metaRight}</span>
          </div>
        </div>
        <p className="min-h-0 w-full self-stretch text-sm leading-5 font-normal tracking-[-0.02em] text-[#737373]">
          {description}
        </p>
      </div>
    </div>
  );
};

const emptyCommentsFallback = '클라이밍 어때요?-딸기님의 댓글"정말재밌어요:)"';

function commentDescriptionFallback(data: NotificationData, message: string): string {
  const trimmed = message.trim();
  if (trimmed) return trimmed;
  if (data.postTitle) return `${data.postTitle}에 새 댓글이 달렸어요`;
  return '';
}

async function getDescription(
  type: NotificationTypeEnum,
  data: NotificationData,
  teamId: string,
  message: string
): Promise<string> {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return `${data.meetingName ?? ''} 모임이 확정되었어요!.`;
    case 'MEETING_CANCELED':
      return '모임이 취소되었어요';
    case 'COMMENT': {
      if (data.postId == null) return commentDescriptionFallback(data, message);
      try {
        const response = await postsApi.teamIdPostsPostIdCommentsGet({
          teamId,
          postId: data.postId,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          size: 1,
        });
        const list = response.data ?? [];
        if (list.length === 0) return emptyCommentsFallback;
        const commentHost = list[0].author.name;
        const comment = list[0].content;
        return `${data.postTitle ?? ''}에 ${commentHost}님의 댓글 "${comment}"`;
      } catch {
        return commentDescriptionFallback(data, message);
      }
    }
    default:
      return '';
  }
}

function thumbnailForType(type: NotificationTypeEnum): ReactNode {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return <UserIcon />;
    case 'MEETING_CANCELED':
      return <MeetingIcon />;
    case 'COMMENT':
      return <CommentIcon />;
    default:
      return <ApprovedIcon />;
  }
}

function titleForType(type: NotificationTypeEnum): string {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return '모임 확정';
    case 'MEETING_CANCELED':
      return '모임 취소';
    case 'COMMENT':
      return '댓글 알림';
    default:
      return '알림';
  }
}

export const NotificationTab = (props: Notification) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    let cancelled = false;
    void getDescription(props.type, props.data, props.teamId, props.message).then((text) => {
      if (!cancelled) setDescription(text);
    });
    return () => {
      cancelled = true;
    };
  }, [props.id, props.type, props.teamId, props.data, props.message]);

  const metaRight = formatNotificationMetaRelativeTime(props.createdAt);
  const highlighted = !props.isRead;
  const isMeetingConfirmed = props.type === 'MEETING_CONFIRMED';

  return (
    <Button
      type="button"
      variant="ghost"
      className={notificationRowButtonClass}
      onClick={() => {
        void notificationsApi.teamIdNotificationsNotificationIdReadPut({
          teamId: props.teamId,
          notificationId: props.id,
        });
      }}
    >
      <NotificationTabBody
        thumbnail={thumbnailForType(props.type)}
        title={titleForType(props.type)}
        isMeetingConfirmed={isMeetingConfirmed}
        metaRight={metaRight}
        description={description}
        highlighted={highlighted}
      />
    </Button>
  );
};
