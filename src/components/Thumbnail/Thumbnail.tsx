import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Blurhash } from 'react-blurhash';
import { Link } from '@tanstack/react-router';

import { css } from 'styled-system/css';

const image = css({
  maxHeight: '100%',
  maxWidth: '100%',
  objectFit: 'cover',
  zIndex: 1,
  boxShadow: '0 0 1px rgba(255,255,255,0.5)',
});

const cover = css({
  position: 'absolute !important', // override react-blurhash
  height: '100%',
  width: '100%',
  filter: 'blur(12px)',
});

const container = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: 3,
  backgroundColor: 'gray.700',

  transition: 'transform 0.1s ease-in-out',
  _hover: {
    transform: 'scale(1.05)',
  },
});

export function Thumbnail({ photo }: { photo: Basic }) {
  return (
    <Link to={`/photo/${photo.id}`} className={container}>
      {photo.blur_hash ? <Blurhash className={cover} hash={photo.blur_hash} width="100%" height="100%" /> : null}
      <img src={photo.urls.small} className={image} />
    </Link>
  );
}
