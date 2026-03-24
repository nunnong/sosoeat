import { render, screen } from '@testing-library/react';

import { NotificationTab } from './notification-tab';

describe('NotificationTab', () => {
  it('제목·설명·메타를 표시한다', () => {
    render(
      <NotificationTab
        thumbnail={<span data-testid="thumb">T</span>}
        title="테스트 제목"
        metaRight="방금"
        description="테스트 본문입니다."
      />
    );

    expect(screen.getByTestId('thumb')).toBeInTheDocument();
    expect(screen.getByText('테스트 제목')).toBeInTheDocument();
    expect(screen.getByText('방금')).toBeInTheDocument();
    expect(screen.getByText('테스트 본문입니다.')).toBeInTheDocument();
  });
});
