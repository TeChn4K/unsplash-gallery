import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { useSearch } from '~/api/search';
import { Thumbnail } from '~/components/Thumbnail';
import { Grid } from '~/components/Grid';
import { useInfiniteLoader } from '~/hooks/useInfiniteLoader';

export const Route = createFileRoute('/_layout/search/$search')({
  component: SearchComponent,
});

function SearchComponent() {
  const { search } = Route.useParams();
  const { isLoading, fetchNextPage, data } = useSearch({ search });
  const Trigger = useInfiniteLoader({ isLoading, fetchNextPage });

  return (
    <>
      <Grid>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((photo) => (
              <Thumbnail key={photo.id} photo={photo} />
            ))}
          </React.Fragment>
        ))}
      </Grid>

      <Trigger />
    </>
  );
}
