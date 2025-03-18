import { Alert, Box, Paper, Snackbar, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect } from "react";
import { styles } from "../Style/DashboardStyle";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ComicDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [trigger, setTrigger] = React.useState({ trigger: false, message: "" });
    const [tabSelected, setTabSelected] = React.useState("/admin/comic/search");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const syncTabWithRoute = () => {
            const path = location.pathname;
            if (path.endsWith('/search')) {
                setTabSelected("/admin/comic/search");
            } else if (path.endsWith('/create')) {
                setTabSelected("/admin/comic/create");
        }else {
            setTabSelected("/admin/comic/:id");
        }
        };

        syncTabWithRoute();
    }, [location.pathname]);

    const comicNavigate = (link: string) => {
        if (link === "/admin/comic/:id") {
            setTrigger({
                trigger: true,
                message: "Please select a comic from the Comic List to add new chapters"
            });
            return;
        }
        setTabSelected(link);
        navigate(link);
    };

    const handleSnackbarClose = () => {
        setTrigger({ trigger: false, message: "" });
};

    return (
        <Box sx={styles.content}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                open={trigger.trigger}
                // message={trigger.message}
            > 
            <Alert
            onClose={handleSnackbarClose}
            severity="warning"
            variant="filled"
            sx={{ width: '100%' }}
          >
           {trigger.message}
          </Alert>
          </Snackbar>
            <Paper component="form" elevation={3} sx={styles.tabBar(theme, isMobile)}>
                <Tabs 
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                    variant="fullWidth"
                    sx={styles.tabs(theme,isMobile)}
                    value={tabSelected}
                    onChange={(e, value) => comicNavigate(value)}
                >
                    <Tab value={"/admin/comic/search"} label="Comic List" />
                    <Tab value={"/admin/comic/create"} label="Create New Comic" />
                    <Tab value={"/admin/comic/:id"} label="Add New Comic Chapter" />
                </Tabs>
            </Paper>
            <Outlet />
        </Box>
    );
};