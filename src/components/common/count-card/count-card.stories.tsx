import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CountCard } from './count-card';

const meta: Meta<typeof CountCard> = {
  title: 'COMPONENTS/common/card-count',
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
    variant: 'meeting',
    count: 12,
    title: '모임 찾기',
  },
};
export const FavoriteCount: Story = {
  args: {
    variant: 'favorite',
    count: 5,
    title: '찜한 모임',
  },
};
export const PostCount: Story = {
  args: {
    variant: 'post',
    count: 8,
    title: '게시글 작성',
  },
};
