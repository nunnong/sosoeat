'use client';

import { NotificationDialog } from './_components/notification-dialog';
import { NotificationPopover } from './_components/notification-popover';
import { useIsMaxWidth743 } from './_components/use-is-max-width-743';
import type { NotificationProps } from './notification.types';

export const Notification = ({ triggerClassName, list }: NotificationProps) => {
  const isNarrow = useIsMaxWidth743();

  if (isNarrow) {
    return <NotificationDialog triggerClassName={triggerClassName} list={list} />;
  }

  return <NotificationPopover triggerClassName={triggerClassName} list={list} />;
};
