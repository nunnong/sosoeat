import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingFilterBar } from './meeting-filter-bar';
import type { MeetingFilterBarProps, RegionSelection } from './meeting-filter-bar.types';

const storyOptions: MeetingFilterBarProps['options'] = [
  { label: '인기순', sortBy: 'participantCount', sortOrder: 'desc' },
  { label: '모임일 임박순', sortBy: 'dateTime', sortOrder: 'asc' },
  { label: '모집 마감 임박 순', sortBy: 'registrationEnd', sortOrder: 'asc' },
  { label: '모집 마감 먼 순', sortBy: 'registrationEnd', sortOrder: 'desc' },
];

const meta = {
  title: 'app/meetings/meeting-filter-bar',
  component: MeetingFilterBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MeetingFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
  args: {
    date: null,
    regionCommitted: null,
    typeFilter: 'all',
    sort: 'participantCount',
    options: storyOptions,
  },
  render: function MeetingFilterBarStory() {
    const [date, setDate] = useState<Date | null>(null);
    const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
    const [typeFilter, setTypeFilter] = useState<'all' | 'groupEat' | 'groupBuy'>('all');
    const [sort, setSort] = useState<MeetingFilterBarProps['sort']>('participantCount');

    return (
      <div className="w-full max-w-6xl">
        <MeetingFilterBar
          date={date}
          regionCommitted={regionCommitted}
          onDateChange={setDate}
          onRegionChange={setRegionCommitted}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          options={storyOptions}
          sort={sort}
          onSortChange={(sortBy) => {
            setSort(sortBy);
          }}
        />
      </div>
    );
  },
};
