 
import { Route, Routes } from "react-router-dom";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import { Account } from "../../pages/Admin/Account";
import { Ticket } from "../../pages/Admin/Ticket";
export default function AdminRoutes(){
    return (
        <Routes>
          <Route path="/admin" element={<AdminDashboardLayout/>}>
                <Route index path="account" element={<Account/>}/>     
                <Route path="ticket" element={<Ticket/>}/>
          </Route>
          
        </Routes>
   
    )
}