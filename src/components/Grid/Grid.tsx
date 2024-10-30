import { PropsWithChildren } from 'react';

import { css } from 'styled-system/css';

const gridStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 2,
  margin: 2,
  '& > *': { width: '25vh', height: '20vh', flex: '1 0 auto' },
});

export function Grid({ children }: PropsWithChildren<{}>) {
  return <div className={gridStyle}>{children}</div>;
}
