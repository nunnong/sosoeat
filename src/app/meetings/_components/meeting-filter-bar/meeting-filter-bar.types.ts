import type { RegionSelection } from '../region-select-modal/region-select-modal.type';

export type { RegionSelection };

export interface MeetingFilterBarProps {
  /** 필터 바 루트 컨테이너에 합쳐진다 */
  className?: string;
  onTypeFilterChange?: (typeFilter: 'all' | 'groupEat' | 'groupBuy') => void;
  onFilterButtonClick?: (filterType: string) => void;
  onDateChange?: (date: Date | null) => void;
  onRegionChange?: (region: RegionSelection) => void;
  onSortChange?: (
    sortBy: 'participantCount' | 'dateTime' | 'registrationEnd',
    sortOrder: 'asc' | 'desc'
  ) => void;
  options: {
    label: '인기순' | '모임일 임박순' | '모집 마감 임박 순' | '모집 마감 먼 순';
    sortBy: 'participantCount' | 'dateTime' | 'registrationEnd';
    sortOrder: 'asc' | 'desc';
  }[];
  sort: 'participantCount' | 'dateTime' | 'registrationEnd';
  regionCommitted: RegionSelection;
  typeFilter: 'all' | 'groupEat' | 'groupBuy';
  date: Date | null;
}
