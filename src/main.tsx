import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import AdminRoutes from './routes/Admin/AdminRoutes';
import { MainRoutes } from './routes/mainRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
 <BrowserRouter>
      <ThemeProvider>
        <AdminRoutes/>
        <MainRoutes/>
      </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>
);
