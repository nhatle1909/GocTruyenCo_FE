import React from 'react';
import { Button, Typography, SxProps, Theme } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";

interface NavtabItemProps {
    title: string;
    navigateLink: string;
}

export const NavtabItem: React.FC<NavtabItemProps> = ({ title, navigateLink }) => {
    const navigate = useNavigate();

    return (
        <Button sx={styles.navtabItem} onClick={() => navigate(`/${navigateLink}`)}>
            <ManageAccountsIcon sx={styles.icon} />
            <Typography sx={styles.text}>{title}</Typography>
        </Button>
    );
};

const styles: Record<string, SxProps<Theme>> = {
    navtabItem: {
   
        width: { xs: '50%', sm: '75%', md: '100%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px solid',
        borderRadius: 1,
        marginTop: { xs: '6%', sm: '8%', md: '10%' },
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#f8f9fa',
        },
    },
    icon: {
        width: { xs: 18, sm: 20, md: 22, lg: 24 },
        height: { xs: 18, sm: 20, md: 22, lg: 24 },
        color: '#432571',
        // marginLeft: { xs: '3%', sm: '4%', md: '5%' },
        marginRight: { xs: '3%', sm: '4%', md: '5%' },
    },
    text: {
        fontSize: { md: 12, lg: 16 },
        display: { xs: 'none', sm:'none', md: 'inline' },
        color: '#333',
        whiteSpace: 'nowrap',
    }
};