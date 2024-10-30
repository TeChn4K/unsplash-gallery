import { Outlet, createFileRoute } from '@tanstack/react-router';

import { Header } from '~/components/Header';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
