import { cva } from 'class-variance-authority';

import type { MeetingCategory } from '@/types/meeting';

// ── 카테고리 레이블 ───────────────────────────────────────────

export const CATEGORY_LABEL: Record<MeetingCategory, string> = {
  groupEat: '같이먹기',
  groupBuy: '공동구매',
};

// ── cva variants ─────────────────────────────────────────────
// 색상 관련 모든 분기는 이 파일에서만 관리합니다.
// 컴포넌트는 category prop 하나만 받고, 여기서 색을 파생합니다.

/** 기본 액션 버튼 (참여하기 / 모임 확정하기) */
export const actionButtonVariants = cva(
  'h-full w-full rounded-2xl text-sm md:text-base lg:text-xl',
  {
    variants: {
      category: {
        groupEat: 'bg-sosoeat-orange-600 text-white hover:bg-sosoeat-orange-700',
        groupBuy: 'bg-sosoeat-blue-600 text-white hover:bg-sosoeat-blue-700',
      },
    },
  }
);

/** 흰 버튼 (참여 취소하기 / 공유하기) */
export const outlineButtonVariants = cva(
  'h-full w-full rounded-2xl bg-white text-normal md:text-sm lg:text-xl',
  {
    variants: {
      category: {
        groupEat:
          'border border-sosoeat-orange-800 shadow-sosoeat-inset text-sosoeat-orange-700 hover:bg-white',
        groupBuy:
          'border border-sosoeat-blue-800 shadow-sosoeat-inset text-sosoeat-blue-700 hover:bg-white',
      },
    },
  }
);

/** InfoRow 아이콘 컨테이너 배경 */
export const iconBgVariants = cva('', {
  variants: {
    category: {
      groupEat: 'bg-sosoeat-orange-100',
      groupBuy: 'bg-sosoeat-blue-50',
    },
  },
});

/** InfoRow 아이콘 색상 */
export const iconColorVariants = cva('', {
  variants: {
    category: {
      groupEat: 'text-sosoeat-orange-600',
      groupBuy: 'text-sosoeat-blue-600',
    },
  },
});
