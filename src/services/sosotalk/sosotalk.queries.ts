import { useQuery } from '@tanstack/react-query';

import { getSosoTalkPostList } from './sosotalk.api';
import type { GetSosoTalkPostListParams } from './sosotalk.types';

export const useGetSosoTalkPostList = (params?: GetSosoTalkPostListParams) =>
  useQuery({
    queryKey: ['sosotalk-post-list', params],
    queryFn: () => getSosoTalkPostList(params),
  });
