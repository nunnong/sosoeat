import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Notification, NotificationList } from './index';

const meta: Meta<typeof Notification> = {
  title: 'components/common/notification/Notification',
  component: Notification,
} satisfies Meta<typeof Notification>;

export default meta;

export const Default: StoryObj<typeof Notification> = {
  render: () => <Notification list={<NotificationList />} />,
};
