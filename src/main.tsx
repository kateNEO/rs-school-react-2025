import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <ErrorBoundary
    fallback={
      <div className="text-gray-500">
        It&apos;s okay. You need refresh page.
      </div>
    }
  >
    <App />
  </ErrorBoundary>
);
