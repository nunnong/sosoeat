import { render, screen } from '@testing-library/react';

import { Footer } from './footer';

describe('Footer Component', () => {
  it('서비스 로고와 저작권 텍스트를 렌더링 하는지 테스트', () => {
    render(<Footer />);

    const logoImage = screen.getByAltText('서비스 로고');
    expect(logoImage).toBeInTheDocument();

    const copyrightText = screen.getByText('© 2026 소소잇. All rights reserved.');
    expect(copyrightText).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Footer className="custom-test-class" />);
    expect(container.firstChild).toHaveClass('custom-test-class');
  });
});
