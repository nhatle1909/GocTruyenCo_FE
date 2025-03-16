import { Box, Container, CssBaseline } from "@mui/material"
import { Outlet } from "react-router-dom"
import { MainHeader } from "../components/headers/MainHeader"

export const MainLayout = () => {
    return (
        <Box sx={ {
            display: 'flex',
            minHeight: '100vh',
            minWidth: '100vw',
            flexDirection: 'row',
        }}>
        <CssBaseline />
        <MainHeader/>
       <Outlet></Outlet>
    </Box>
    )
}
