import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'rsuite/dist/rsuite.min.css';  // or 'rsuite/styles/index.less';
import { CustomProvider } from 'rsuite';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
        <CustomProvider>
        <App />
        </CustomProvider>
          
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
