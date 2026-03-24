import { scrollAreaDesktopClass, scrollAreaMobileClass } from './notification-scroll-area';

describe('notification-scroll-area', () => {
  it('scrollAreaDesktopClass에 overflow-y-auto가 포함된다', () => {
    expect(scrollAreaDesktopClass).toContain('overflow-y-auto');
  });

  it('scrollAreaMobileClass에 flex-1이 포함된다', () => {
    expect(scrollAreaMobileClass).toContain('flex-1');
  });
});
