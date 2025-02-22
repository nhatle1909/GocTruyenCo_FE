import { Box, CssBaseline, Drawer } from "@mui/material"
import { Outlet, OutletProps } from "react-router-dom"
import { DashboardHeader } from "../components/DashboardHeader"
import { NavtabItem } from "../components/NavtabItem"
import zIndex from "@mui/material/styles/zIndex"

export const AdminDashboardLayout = () => {
    return (
        <Box sx={styles.container}>
            <CssBaseline />
            <DashboardHeader avatarURL={""} notificationCount={5} title1='Admin' title2={'Dashboard'} />
            <Box component="main" sx={styles.main}>
                <Drawer sx={styles.drawer} variant="persistent" open={true}>
                    <Box sx={styles.drawerContent}>
                        <NavtabItem title='Account' navigateLink='admin/account' />
                        <NavtabItem title='Ticket' navigateLink='admin/ticket' />
                    </Box>
                </Drawer>
                    <Outlet />
            </Box>
        </Box>
    )
}
const styles = ({
    container: {
        display: 'flex',
        minHeight: '100vh',
        minWidth: '100vw',
        flexDirection: 'row',
    },
    main: {
        display: 'flex',
        marginTop: '64px',
        minHeight: '90%',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-between',
    },
    drawer: {
        zIndex:0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: '15%',
            boxSizing: 'border-box',
            top: '64px',
            height: 'calc(100% - 64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            
        },
    },
    drawerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        padding: '16px',
    }, content: {
        backgroundColor: '#f3f3f3',
        width: '85%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
})