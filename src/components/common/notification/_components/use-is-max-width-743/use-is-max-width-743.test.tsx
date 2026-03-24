import { renderHook } from '@testing-library/react';

import { useIsMaxWidth743 } from './use-is-max-width-743';

describe('useIsMaxWidth743', () => {
  it('matchMedia가 없으면 false', () => {
    const { result } = renderHook(() => useIsMaxWidth743());
    expect(result.current).toBe(false);
  });
});
