'use client';

import Image from 'next/image';

import {
  CalendarDays,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar';
import { Badge } from '@/components/ui/badge/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';

import type { SosoTalkPostDetailProps } from './sosotalk-post-detail.types';

export function SosoTalkPostDetail({
  title,
  content,
  contentCharacterCount,
  imageUrl,
  authorName,
  authorImageUrl,
  categoryLabel,
  statusLabel,
  likeCount = 0,
  commentCount = 0,
  createdAt,
  createdAtDateTime,
  isAuthor = false,
  onMoreClick,
  onEditClick,
  onDeleteClick,
  onShareClick,
}: SosoTalkPostDetailProps) {
  const normalizedContent = content.trim();

  return (
    <article className="border-sosoeat-gray-300 bg-card w-full overflow-hidden rounded-[32px] border shadow-[0_2px_14px_rgba(30,30,30,0.04)]">
      <div className="flex flex-col px-5 py-6 md:px-10 md:py-8 lg:px-12 lg:py-11">
        <header className="flex flex-col gap-4 md:gap-5">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-1 flex-col gap-4 md:gap-5">
              {(categoryLabel || statusLabel) && (
                <div className="flex flex-wrap items-center gap-3">
                  {categoryLabel && (
                    <Badge
                      variant="outline"
                      className="border-sosoeat-orange-600 text-sosoeat-orange-600 h-7 rounded-full px-3 text-sm font-semibold"
                    >
                      {categoryLabel}
                    </Badge>
                  )}
                  {statusLabel && (
                    <Badge className="bg-sosoeat-orange-600 text-white h-7 rounded-full px-3 text-sm font-semibold hover:bg-sosoeat-orange-600">
                      {statusLabel}
                    </Badge>
                  )}
                </div>
              )}

              <h1 className="text-sosoeat-gray-900 text-2xl font-semibold md:text-3xl">{title}</h1>
            </div>

            {isAuthor ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="text-sosoeat-gray-500 hover:text-sosoeat-gray-700 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
                    aria-label="게시글 메뉴"
                    onClick={onMoreClick}
                  >
                    <MoreHorizontal className="h-7 w-7" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px]">
                  <DropdownMenuItem onClick={onEditClick}>수정하기</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={onDeleteClick}>
                    삭제하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="border-sosoeat-gray-300 h-8 w-8 border md:h-9 md:w-9">
                <AvatarImage src={authorImageUrl} alt={authorName} />
                <AvatarFallback>{authorName.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="text-sosoeat-gray-900 text-base font-semibold">{authorName}</span>
            </div>

            <div className="text-sosoeat-gray-700 flex shrink-0 items-center gap-2 text-sm font-medium md:text-base">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <time dateTime={createdAtDateTime ?? undefined}>{createdAt}</time>
            </div>
          </div>
        </header>

        <section className="border-sosoeat-gray-300 mt-6 flex flex-col gap-5 border-t pt-5 md:mt-8 md:gap-6 md:pt-6">
          <p className="text-sosoeat-gray-800 text-lg font-normal whitespace-pre-wrap">
            {normalizedContent}
          </p>

          {imageUrl ? (
            <div className="border-sosoeat-gray-300 bg-sosoeat-gray-100 relative aspect-[303/246] w-full max-w-[303px] overflow-hidden rounded-[18px] border md:max-w-[360px] lg:max-w-[420px] xl:max-w-[506px] xl:rounded-[24px]">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 303px, (max-width: 1023px) 360px, (max-width: 1279px) 420px, 506px"
                priority
              />
            </div>
          ) : null}

          <div
            className={`flex items-center gap-4 border-t border-sosoeat-gray-300 pt-4 ${
              typeof contentCharacterCount === 'number' ? 'justify-between' : 'justify-end'
            }`}
          >
            {typeof contentCharacterCount === 'number' ? (
              <div className="text-sosoeat-gray-500 text-sm font-medium md:text-base">
                {contentCharacterCount}자
              </div>
            ) : null}

            <div className="flex items-center gap-4 md:gap-6">
              <PostMetaItem icon={Heart} label="좋아요" value={likeCount} />
              <PostMetaItem icon={MessageCircle} label="댓글" value={commentCount} />
              <ActionIcon
                className="text-sosoeat-gray-900 hover:text-sosoeat-orange-600 inline-flex"
                label="공유"
                onClick={onShareClick}
              >
                <Share2 className="h-6 w-6" />
              </ActionIcon>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

interface PostMetaItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}

function PostMetaItem({ icon: Icon, label, value }: PostMetaItemProps) {
  return (
    <span className="text-sosoeat-gray-900 inline-flex items-center gap-2" aria-label={`${label} ${value}개`}>
      <Icon className="h-6 w-6 shrink-0" />
      <span>{value}</span>
    </span>
  );
}

interface ActionIconProps {
  children: React.ReactNode;
  className: string;
  label: string;
  onClick?: () => void;
}

function ActionIcon({ children, className, label, onClick }: ActionIconProps) {
  const baseClassName =
    'h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors';

  if (!onClick) {
    return (
      <span className={`${baseClassName} ${className}`} aria-hidden="true">
        {children}
      </span>
    );
  }

  return (
    <button type="button" className={`${baseClassName} ${className}`} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}
