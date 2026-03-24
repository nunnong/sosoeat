import type { ReactNode } from 'react';

export interface NotificationProps {
  /** 알림 아이콘 트리거 버튼에 합쳐지는 클래스 */
  triggerClassName?: string;
  /** 스크롤 영역에 렌더할 알림 목록 */
  list: ReactNode;
}
