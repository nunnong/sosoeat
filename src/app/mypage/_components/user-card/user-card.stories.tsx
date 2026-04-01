import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UserCard } from './user-card';

const meta: Meta<typeof UserCard> = {
  title: 'APP/mypage/user-card',
  component: UserCard,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    joinedAt: { control: 'text' },
    email: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    name: '김민준',
    joinedAt: '2024-01-15',
    email: '1인 가구 3년차입니다. 식재료 낭비 없이 알뜰하게 살고 싶어요!',
    className: 'bg-sosoeat-gray-100',
  },
};

export const Mobile: Story = {
  args: {
    name: '김민준',
    joinedAt: '2024-01-15',
    className: 'bg-sosoeat-gray-100',
  },
};
