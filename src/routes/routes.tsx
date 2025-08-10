import App from '../App.tsx';
import { ROUTES } from './paths.ts';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import NotFound from '../pages/NotFound.tsx';
import About from '../pages/About.tsx';
import Book from '../components/Book.tsx';
import { PAGE_DEFAULT } from '../const/const.ts';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: (
        <ErrorBoundary
          fallback={
            <div className="text-red-500">
              It&apos;s okay. You need refresh page.
            </div>
          }
        >
          <App />
        </ErrorBoundary>
      ),
      children: [
        {
          index: true,
          element: <Navigate to={`/page/${PAGE_DEFAULT}`} replace />,
        },
        {
          path: ROUTES.PAGE,
          element: <MainPage />,
          children: [
            {
              path: ROUTES.BOOK,
              element: <Book />,
            },
          ],
        },
        {
          path: ROUTES.ABOUT,
          element: <About />,
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: '/rs-school-react-2025/',
  }
);

export default router;
