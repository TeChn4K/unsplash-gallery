import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Basic } from 'unsplash-js/dist/methods/photos/types';

import api from '~/utils/api';

type FetchParams = {
  id: Basic['id'];
};

export async function fetchPhoto({ id }: FetchParams) {
  const res = await api.get<Basic>(`/photos/${id}`, {});
  return res.data;
}

type QueryCachePhoto = {
  pages: Array<Array<Basic>>;
};

export function usePhoto({ id }: { id: Basic['id'] }) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['photo', id],
    queryFn: () => fetchPhoto({ id }),

    staleTime: 1000 * 60,

    initialData: () => {
      // Aggregate all known photos to find the one we need
      const alreadyFetchedData = queryClient
        .getQueriesData<QueryCachePhoto>({ queryKey: ['photos'] })
        .flatMap(([, data]) => data?.pages ?? [])
        .flatMap((arr) => arr);

      return alreadyFetchedData.find((d) => d.id === id);
    },
  });
}
