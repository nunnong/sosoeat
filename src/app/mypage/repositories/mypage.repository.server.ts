import { CookieStorage } from '@/lib/auth/cookie-storage';
import { FavoriteCount, User, UserMeetingsResponse } from '@/types/generated-client';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export const fetchMeServer = async (): Promise<User | null> => {
  const token = await CookieStorage.getAccessToken();
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
};

export const fetchMeetingCountServer = async (): Promise<number> => {
  const token = await CookieStorage.getAccessToken();
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/users/me/meetings?size=9999`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) return 0;
  const data: UserMeetingsResponse = await res.json();
  return data.data.length;
};

export const fetchFavoriteCountServer = async (): Promise<number> => {
  const token = await CookieStorage.getAccessToken();
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/favorites/count`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) return 0;
  const data: FavoriteCount = await res.json();
  return data.count;
};
