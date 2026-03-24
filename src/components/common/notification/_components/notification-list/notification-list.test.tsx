import { render, screen } from '@testing-library/react';

import { NotificationList } from './notification-list';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ src, alt }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element -- Jest mock for next/image
    return <img src={src} alt={alt} />;
  },
}));

describe('NotificationList', () => {
  it('샘플 알림 제목이 보인다', () => {
    render(<NotificationList />);
    expect(screen.getByText('모임 초대')).toBeInTheDocument();
    expect(screen.getByText('모임 일정')).toBeInTheDocument();
  });
});
