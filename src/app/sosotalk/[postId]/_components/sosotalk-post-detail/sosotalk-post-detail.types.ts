export interface SosoTalkPostDetailProps {
  title: string;
  content: string;
  contentCharacterCount?: number;
  imageUrl?: string;
  authorName: string;
  authorImageUrl?: string;
  categoryLabel?: string;
  statusLabel?: string;
  likeCount?: number;
  commentCount?: number;
  createdAt: string;
  createdAtDateTime?: string;
  isAuthor?: boolean;
  onMoreClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onShareClick?: () => void;
}
