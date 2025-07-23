import App from '../App.tsx';
import { ROUTES } from './paths.ts';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../components/MainPage.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: (
        <ErrorBoundary
          fallback={
            <div className="text-gray-500">
              It&apos;s okay. You need refresh page.
            </div>
          }
        >
          <App />
        </ErrorBoundary>
      ),
      children: [
        {
          path: ROUTES.HOME,
          index: true,
          element: <MainPage />,
        },
        {
          path: 'planet/:id',
          // element: <Planet />,
        },
        {
          path: ROUTES.ABOUT,
          // element: <About />,
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <>404</>,
        },
      ],
    },
  ],
  {
    basename: '/rs-school-react-2025',
  }
);

export default router;
