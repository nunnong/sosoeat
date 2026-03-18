export interface BestSoeatCardProps {
  title: string;
  region: string;
  meetingAt: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  className?: string;
  onClick?: () => void;
}
