import type { PostList, PostWithAuthor } from '@/types/generated-client';

export interface GetSosoTalkPostListParams {
  type?: 'all' | 'best';
  sortBy?: 'createdAt' | 'viewCount' | 'likeCount' | 'commentCount';
  sortOrder?: 'asc' | 'desc';
  cursor?: string;
  size?: number;
}

export type GetSosoTalkPostListResponse = PostList;

export interface SosoTalkPostCardItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  authorImageUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

const SOSOTALK_POST_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop';

const SOSOTALK_AUTHOR_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop';

export const mapPostToSosoTalkCardItem = (post: PostWithAuthor): SosoTalkPostCardItem => ({
  id: post.id,
  title: post.title,
  content: post.content,
  imageUrl: post.image || SOSOTALK_POST_IMAGE_FALLBACK,
  authorName: post.author.name,
  authorImageUrl: post.author.image || SOSOTALK_AUTHOR_IMAGE_FALLBACK,
  likeCount: post.likeCount,
  commentCount: post.count.comments,
  createdAt: formatSosoTalkDate(post.createdAt),
});

const formatSosoTalkDate = (createdAt: Date): string =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(createdAt)
    .replace(/\.\s/g, '.')
    .replace(/\.$/, '');
