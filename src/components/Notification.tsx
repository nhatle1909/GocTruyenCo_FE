import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, CardActionArea, Avatar, Box, IconButton, Badge, Popover, useTheme } from '@mui/material';
import  LogoutIcon  from '@mui/icons-material/Logout';
import  NotificationsIcon  from '@mui/icons-material/Notifications';
import { ThemeContext } from '../context/ThemeContext';

interface NotificationItemProps {
    avatar: string;
    title: string;
    message: string;
    date: string;
    type: 'success' | 'warning' | 'error' | 'info';
}
interface NotificationProps{
    avatarURL: string;
    onLogout : () => void;
}
export const NotificationItem: React.FC<NotificationItemProps> = ({ avatar, title, message, date, type }) => {
    
    return (
        <Card sx={notificationItemStyles.card}>
            <CardActionArea>
                <CardContent sx={notificationItemStyles.content}>
                    <Box sx={notificationItemStyles.header}>
                        <Avatar src={avatar} sx={notificationItemStyles.avatar} />
                        <Box>
                            <Typography sx={notificationItemStyles.title}>{title}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={notificationItemStyles.time}>{date}</Typography>
                        </Box>
                    </Box>
                    <Typography sx={notificationItemStyles.message}>{message}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
const notificationItemStyles = {
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
export const Notification:React.FC<NotificationProps> = ({avatarURL,onLogout}) => {
    
    const notifications = [{
        id: '1',
        avatar: 'https://example.com/avatar.jpg',
        title: 'New message from John Doe',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '10:30 AM',
      },
      {
          id: '2',
          avatar: 'https://example.com/avatar.jpg',
          title: 'New file uploaded',
          message: 'Consectetur adipiscing elit.',
          date: '9:45 AM',
      }
      ];
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const onNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
      setAnchorEl(null);
    }
  
    const open = Boolean(anchorEl);
    const id = open ? 'notification-popover' : undefined;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center',}}>
        <IconButton onClick={onNotificationClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {notifications.map((item, index) => (
          <NotificationItem 
            key={index}
            avatar={item.avatar} 
            title={item.title} 
            message={item.message}  
            date={item.date} 
            type="success"
          />
        ))}
      </Popover>
      <Avatar src={avatarURL} sx={{  width: 35,  height: 35, margin: '0 16px', }} />
      <IconButton onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
      </Box>
    )
    
}