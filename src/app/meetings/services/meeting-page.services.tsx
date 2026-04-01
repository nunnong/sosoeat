import { TeamIdMeetingsGetRequest } from '@/types/generated-client';

export const makeQueryString = (params: Omit<TeamIdMeetingsGetRequest, 'teamId'>): string => {
  const { dateStart, dateEnd, ...rest } = params;
  const formattedDateStart = dateStart ? dateStart.toISOString() : undefined;
  const formattedDateEnd = dateEnd ? dateEnd.toISOString() : undefined;

  let q = Object.entries(rest)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  q = q.concat(formattedDateStart ? `&dateStart=${encodeURIComponent(formattedDateStart)}` : '');
  q = q.concat(formattedDateEnd ? `&dateEnd=${encodeURIComponent(formattedDateEnd)}` : '');

  return q ? `?${q}` : '';
};
