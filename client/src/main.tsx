import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './routes';
import 'normalize.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
