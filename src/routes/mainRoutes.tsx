import { Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Homepage } from "../pages/Main/Homepage"

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<MainLayout />} >
            <Route  index element={<Homepage />} />
            </Route>
            </Routes>
    )
}