'use client';

import { useSyncExternalStore } from 'react';

import type { UseIsMaxWidth375Result } from './use-is-max-width-375.types';

const QUERY = '(max-width: 375px)';

function getSnapshot(): boolean {
  if (typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void): () => void {
  if (typeof window.matchMedia !== 'function') return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getServerSnapshot(): boolean {
  return false;
}

/** 뷰포트 너비가 375px 이하인지 */
export function useIsMaxWidth375(): UseIsMaxWidth375Result {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
