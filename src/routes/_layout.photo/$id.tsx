import { createFileRoute } from '@tanstack/react-router';
import { Blurhash } from 'react-blurhash';

import { usePhoto } from '~/api/photo';

import { Container } from 'styled-system/jsx';
import { css } from 'styled-system/css';

export const Route = createFileRoute('/_layout/photo/$id')({
  component: PhotoComponent,
});

function PhotoComponent() {
  const { id } = Route.useParams();
  const query = usePhoto({ id });

  if (!query.data) {
    return null;
  }

  const photo = query.data;

  return (
    <>
      {photo.blur_hash ? (
        <Blurhash
          className={css({
            position: 'fixed !important',
            inset: '0',
            filter: 'opacity(0.5)',
          })}
          hash={photo.blur_hash}
          width="100%"
          height="100%"
        />
      ) : null}

      <Container maxW={'4xl'} css={{ marginTop: 2 }}>
        <img src={photo.urls.regular} />

        <ul>
          <li>Description: {photo.description ? photo.description : '-'}</li>
          <li>Likes: {photo.likes}</li>
          <li>User: {photo.user.name}</li>
          <li>
            Original: <a href={photo.links.html}>{photo.links.html}</a>
          </li>
        </ul>
      </Container>
    </>
  );
}
