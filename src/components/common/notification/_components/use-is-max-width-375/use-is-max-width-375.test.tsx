import { renderHook } from '@testing-library/react';

import { useIsMaxWidth375 } from './use-is-max-width-375';

describe('useIsMaxWidth375', () => {
  it('matchMedia가 없으면 false', () => {
    const { result } = renderHook(() => useIsMaxWidth375());
    expect(result.current).toBe(false);
  });
});
