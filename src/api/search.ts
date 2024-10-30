import { useInfiniteQuery } from '@tanstack/react-query';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

import api from '~/utils/api';

type FetchParams = {
  pageParam?: number;
} & QueryParams;

export async function fetchSearch({ pageParam = 1, search }: FetchParams) {
  const res = await api.get<Photos>('/search/photos', {
    params: {
      query: search,
      per_page: 30,
      page: pageParam,
    },
  });
  return res.data.results;
}

type QueryParams = {
  search: string;
};

export function useSearch({ search }: QueryParams) {
  return useInfiniteQuery({
    queryKey: ['photos', search],
    queryFn: ({ pageParam }) => fetchSearch({ pageParam, search }),

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
