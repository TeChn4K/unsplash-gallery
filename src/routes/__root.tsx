import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
