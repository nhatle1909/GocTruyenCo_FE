 
import { Route, Routes } from "react-router-dom";
import { AdminDashboardLayout } from "../../layouts/DashboardLayout";
import { Account } from "../../pages/Dashboard/Account/AccountManager";
import { Ticket } from "../../pages/Dashboard/Ticket";
import { ComicDashboard } from "../../pages/Dashboard/Comic/ComicManager";
import { ComicSearch } from "../../pages/Dashboard/Comic/ComicSearch";
import { ComicCreate } from "../../pages/Dashboard/Comic/ComicCreate";
import { ComicChapterCreate } from "../../pages/Dashboard/Comic/ComicChapterCreate";
export default function AdminRoutes(){
    return (
        <Routes>
          <Route path="/admin" element={<AdminDashboardLayout/>}>
                <Route path="account" element={<Account/>}/>     
                <Route path="ticket" element={<Ticket/>}/>
                <Route path="comic" element={<ComicDashboard/>}>
                    <Route path="search" element={<ComicSearch/>}/>
                    <Route path="create" element={<ComicCreate/>}/>
                    <Route path=":comicId" element={<ComicChapterCreate/>}/>
                </Route>
          </Route>
          
        </Routes>
   
    )
}