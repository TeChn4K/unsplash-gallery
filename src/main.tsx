import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import './index.css';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultViewTransition: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
