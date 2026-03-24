import { cn } from '@/lib/utils';

const scrollbarClass =
  '[scrollbar-width:thin] [scrollbar-color:#CCCCCC_transparent] ' +
  '[&::-webkit-scrollbar]:w-1 ' +
  '[&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[#CCCCCC]';

export const scrollAreaDesktopClass = cn(
  'h-[360px] w-full overflow-x-hidden overflow-y-auto',
  scrollbarClass
);

export const scrollAreaMobileClass = cn(
  'min-h-0 flex-1 overflow-x-hidden overflow-y-auto',
  scrollbarClass
);
