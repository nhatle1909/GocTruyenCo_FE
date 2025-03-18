import { Box, Container, CssBaseline } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { MainHeader } from "../components/headers/MainHeader"

export const MainLayout = () => {
    const location = useLocation();
    
    // Don't render MainHeader for admin routes
    const isAdminRoute = location.pathname.startsWith('/admin');
    
    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            minWidth: '100vw',
            flexDirection: 'row',
        }}>
        <CssBaseline />
            {!isAdminRoute && <MainHeader />}
            <Outlet />
    </Box>
    )
}
