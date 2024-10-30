import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from 'styled-system/css';

type Props = {
  isLoading: boolean;
  fetchNextPage: () => void;
};

const trigger = css({
  opacity: 0,
});

export function useInfiniteLoader({ isLoading, fetchNextPage }: Props) {
  const { ref, inView } = useInView({ rootMargin: '20%' });

  React.useEffect(() => {
    if (!isLoading && inView) {
      fetchNextPage();
    }
  }, [isLoading, fetchNextPage, inView]);

  // Return a component that will trigger the fetchNextPage function when it is in view
  return React.useCallback(() => {
    return (
      <footer className={trigger} ref={ref}>
        Loading ...
      </footer>
    );
  }, [ref]);
}
