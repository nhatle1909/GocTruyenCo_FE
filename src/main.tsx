
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AdminRoutes from './routes/Admin/AdminRoutes';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <StrictMode>
 <BrowserRouter>
   <AdminRoutes/>
  </BrowserRouter>
  // </StrictMode>
)
