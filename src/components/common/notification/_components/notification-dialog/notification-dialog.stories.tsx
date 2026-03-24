import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NotificationList } from '../notification-list';

import { NotificationDialog } from './notification-dialog';

const meta: Meta<typeof NotificationDialog> = {
  title: 'components/common/notification/Dialog',
  component: NotificationDialog,
} satisfies Meta<typeof NotificationDialog>;

export default meta;

export const Default: StoryObj<typeof NotificationDialog> = {
  render: () => <NotificationDialog list={<NotificationList />} />,
};
