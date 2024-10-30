import { useInfiniteQuery } from '@tanstack/react-query';
import { Basic } from 'unsplash-js/dist/methods/photos/types';

import api from '~/utils/api';

type FetchParams = {
  pageParam?: number;
};

export async function fetchPhotos({ pageParam = 1 }: FetchParams) {
  const res = await api.get<Array<Basic>>('/photos', {
    params: {
      per_page: 30,
      page: pageParam,
    },
  });
  return res.data;
}

/**
 * Fetch photos from the Unsplash Editorial feed
 */
export function usePhotos() {
  return useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => fetchPhotos({ pageParam }),

    staleTime: 1000 * 60,

    initialPageParam: 1,
    // Unsplash does not give us any cursor
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
