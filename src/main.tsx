import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from './routes/Admin/AdminRoutes';
import { MainRoutes } from './routes/mainRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
 <BrowserRouter basename="/">
      <ThemeProvider>
    <Routes>
        <Route path='*' element={ <MainRoutes/>}></Route>
        <Route path='/admin/*' element={ <AdminRoutes/>}></Route>
         </Routes>
   
      </ThemeProvider>
  </BrowserRouter>
 
);
