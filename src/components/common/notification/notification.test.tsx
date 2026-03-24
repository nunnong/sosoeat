import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Notification, NotificationList } from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) {
    // eslint-disable-next-line @next/next/no-img-element -- Jest mock for next/image
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  },
}));

const list = <NotificationList />;

function mockMatchMedia(matches375: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === '(max-width: 375px)' ? matches375 : false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
}

describe('Notification', () => {
  it('알림 열기 트리거가 표시된다', () => {
    render(<Notification list={list} />);
    expect(screen.getByRole('button', { name: '알림 열기' })).toBeInTheDocument();
  });

  it('triggerClassName이 트리거 버튼에 적용된다', () => {
    render(<Notification list={list} triggerClassName="trigger-test-class" />);
    expect(screen.getByRole('button', { name: '알림 열기' })).toHaveClass('trigger-test-class');
  });

  it('트리거 클릭 시 알림 내역과 목록이 보인다 (넓은 화면: Popover)', async () => {
    const user = userEvent.setup();
    render(<Notification list={list} />);

    await user.click(screen.getByRole('button', { name: '알림 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
    expect(screen.getByText('모임 초대')).toBeInTheDocument();
  });

  describe('375px 이하 (Dialog)', () => {
    beforeEach(() => {
      mockMatchMedia(true);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('트리거 클릭 시 Dialog에 주입 목록이 보인다', async () => {
      const user = userEvent.setup();
      render(<Notification list={list} />);

      await user.click(screen.getByRole('button', { name: '알림 열기' }));

      expect(await screen.findByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
      expect(screen.getByText('모임 초대')).toBeInTheDocument();
    });
  });
});
