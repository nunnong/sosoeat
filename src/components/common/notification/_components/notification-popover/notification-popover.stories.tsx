import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NotificationList } from '../notification-list';

import { NotificationPopover } from './notification-popover';

const meta: Meta<typeof NotificationPopover> = {
  title: 'components/common/notification/Popover',
  component: NotificationPopover,
} satisfies Meta<typeof NotificationPopover>;

export default meta;

export const Default: StoryObj<typeof NotificationPopover> = {
  render: () => <NotificationPopover list={<NotificationList />} />,
};
