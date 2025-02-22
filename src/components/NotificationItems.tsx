import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Avatar, Box } from '@mui/material';

interface NotificationProps {
    avatar: string;
    title: string;
    message: string;
    time: string;
    type: 'success' | 'warning' | 'error' | 'info';
}

export const NotificationItem: React.FC<NotificationProps> = ({ avatar, title, message, time, type }) => {
    return (
        <Card sx={styles.card}>
            <CardActionArea>
                <CardContent sx={styles.content}>
                    <Box sx={styles.header}>
                        <Avatar src={avatar} sx={styles.avatar} />
                        <Box>
                            <Typography sx={styles.title}>{title}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={styles.time}>{time}</Typography>
                        </Box>
                    </Box>
                    <Typography sx={styles.message}>{message}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

const styles = {
    card: {
        width: 280,
        borderRadius: 1,
        border: '2px solid black',
        margin: 1,
        '&:hover': {
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f5f5f5',
        },
    },
    content: {
        padding: '8px 12px',
    },
    header: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: 0.5,
    },
    avatar: {
        width: 20,
        height: 20,
        marginRight: 1,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 1.2,
    },
    time: {
        fontSize: 10,
        lineHeight: 1,
    },
    message: {
        fontSize: 11,
        marginTop: 0.5,
    },
};
