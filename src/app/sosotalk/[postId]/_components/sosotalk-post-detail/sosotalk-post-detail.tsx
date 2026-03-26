'use client';

import { SosoTalkCommentSection } from '@/app/sosotalk/_components/sosotalk-comment-section';

import type { SosoTalkPostDetailProps } from './sosotalk-post-detail.types';
import { SosoTalkPostDetailActions } from './sosotalk-post-detail-actions';
import { SosoTalkPostDetailBody } from './sosotalk-post-detail-body';
import { SosoTalkPostDetailHeader } from './sosotalk-post-detail-header';

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
  comments = [],
  inputValue,
  inputPlaceholder,
  onChangeInput,
  onSubmitComment,
  currentUserName,
  currentUserImageUrl,
}: SosoTalkPostDetailProps) {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <article className="bg-card border-sosoeat-gray-300 w-full overflow-hidden rounded-[32px] border shadow-[0_2px_14px_rgba(30,30,30,0.04)]">
        <div className="flex flex-col px-5 py-6 md:px-10 md:py-8 lg:px-12 lg:py-11">
          <SosoTalkPostDetailHeader
            title={title}
            authorName={authorName}
            authorImageUrl={authorImageUrl}
            categoryLabel={categoryLabel}
            statusLabel={statusLabel}
            createdAt={createdAt}
            createdAtDateTime={createdAtDateTime}
            isAuthor={isAuthor}
            onMoreClick={onMoreClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
          <SosoTalkPostDetailBody title={title} content={content} imageUrl={imageUrl}>
            <SosoTalkPostDetailActions
              contentCharacterCount={contentCharacterCount}
              likeCount={likeCount}
              commentCount={commentCount}
              onShareClick={onShareClick}
            />
          </SosoTalkPostDetailBody>
        </div>
      </article>

      <SosoTalkCommentSection
        comments={comments}
        commentCount={commentCount}
        inputValue={inputValue}
        inputPlaceholder={inputPlaceholder}
        onChangeInput={onChangeInput}
        onSubmitComment={onSubmitComment}
        currentUserName={currentUserName}
        currentUserImageUrl={currentUserImageUrl}
      />
    </div>
  );
}
