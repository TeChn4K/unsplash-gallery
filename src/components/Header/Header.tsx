import * as React from 'react';
import { Flex, HStack } from 'styled-system/jsx';
import { Link, useLocation, useNavigate, useParams } from '@tanstack/react-router';
import { useIsFetching } from '@tanstack/react-query';

import { Input } from '~/components/ui/Input';
import { Button } from '~/components/ui/button';

import { css } from 'styled-system/css';
import { Spinner } from '../ui/spinner';

const headerStyle = css({
  position: 'sticky',
  top: 0,

  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,

  padding: 2,
  marginInline: 2,
  bg: 'bg.canvas/75',
  backdropFilter: 'blur(14px)',
  border: '1px solid',
  borderColor: 'border.outline',
  borderBottomRadius: 6,
  zIndex: 10,
});

const inputStyle = css({
  bg: 'bg.canvas',
  width: '30vw',
});

export function Header() {
  const navigate = useNavigate();
  const { search } = useParams({ strict: false });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.search.value;

    if (!value) {
      navigate({ to: '/' });
      return;
    }

    navigate({
      to: '/search/$search',
      params: {
        search: value,
      },
    });
  };

  const [inputValue, setInputValue] = React.useState(search ?? '');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
  };

  // TODO: this is not future-proof => watch if we leave the search page
  const isHome = useLocation({
    select: (location) => location.pathname === '/',
  });

  React.useEffect(() => {
    if (isHome === true) {
      setInputValue('');
    }
  }, [isHome]);

  const isFetching = useIsFetching();

  return (
    <Flex className={headerStyle}>
      <HStack css={{ gap: 2 }}>
        <h1 className={css({ flexShrink: 0, fontSize: '2xl' })}>
          <Link to="/">Unsplash Gallery</Link>
        </h1>
        {isFetching ? <Spinner /> : null}
      </HStack>

      <form onSubmit={handleSubmit}>
        <HStack css={{ gap: 2 }}>
          <Input
            name="search"
            value={inputValue}
            onInput={handleInput}
            placeholder="cat, dog, unicorn, ..."
            className={inputStyle}
          />
          <Button>Search</Button>
        </HStack>
      </form>
    </Flex>
  );
}
