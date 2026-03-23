import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CountCard } from './count-card';

const meta: Meta<typeof CountCard> = {
  title: 'COMPONENTS/common/CardCount',
  component: CountCard,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CountCard>;

export const Default: Story = {
  args: {
    count: 0,
    title: '참여 모임',
    className: 'bg-sosoeat-gray-100',
  },
};
export const MeetingCount: Story = {
  args: {
    count: 0,
    title: '참여 모임',
    className: 'bg-sosoeat-orange-100',
    countClassName: 'text-sosoeat-orange-600',
  },
};
export const FavoriteCount: Story = {
  args: {
    count: 0,
    title: '찜한 모임',
    className: 'bg-[#FFF0F0]',
    countClassName: 'text-[#EF4444]',
  },
};
export const PostCount: Story = {
  args: {
    count: 0,
    title: '작성 게시글',
    className: 'bg-sosoeat-blue-50',
    countClassName: 'text-sosoeat-blue-500',
  },
};
