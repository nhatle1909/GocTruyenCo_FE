import React, { useContext, useState } from 'react';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography, useTheme, Popover } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../../context/ThemeContext';
import {NotificationItem} from './../Notification';
import { Outlet } from 'react-router-dom';

interface DashboardHeaderProps {
  avatarURL: string;
  notificationCount: number;
  title1: string;
  title2: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  avatarURL, 
  notificationCount, 
  title1,
  title2,
}) => {
  const notifications = [{
    id: '1',
    avatar: 'https://example.com/avatar.jpg',
    title: 'New message from John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '10:30 AM',
  },
  {
      id: '2',
      avatar: 'https://example.com/avatar.jpg',
      title: 'New file uploaded',
      content: 'Consectetur adipiscing elit.',
      date: '9:45 AM',
  },
  {
      id: '3',
      avatar: 'https://example.com/avatar.jpg',
      title: 'Meeting scheduled',
      content: 'Lorem ipsum dolor sit amet.',
      date: '8:30 AM',
  },
  {
      id: '4',
      avatar: 'https://example.com/avatar.jpg',
      title: 'New project started',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '7:15 AM',
    },
    {
      id: '5',
      avatar: 'https://example.com/avatar.jpg',
      title: 'Payment received',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: '6:00 AM',
    }
];
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const onLogout = () => {
    // Implement logout logic
  }
  const onNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;
  return (
    <AppBar position="fixed" elevation={5} sx={styles.appBar}>
      <Toolbar sx={{ width: '15%' }}>
        <Typography variant="h5" color='black'  component="div">{title1}</Typography>
        <Typography variant="h5" color='purple' noWrap component="div">{title2}</Typography>
      </Toolbar>
      <Box sx={styles.box}>
        <IconButton onClick={toggleTheme}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
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
          <NotificationItem avatar={item.avatar} title={item.title} message={item.content} time={item.date} type="success"/>
        ))}
        </Popover>
        <Avatar src={avatarURL} sx={styles.avatar} />
        <IconButton onClick={onLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </AppBar>
  
     
  
  );
};

const styles = {
  appBar: {
    backgroundColor: 'white',
    top: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom:'1px solid black'
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '64px',
    padding: '0 16px',
  },
  avatar: {
    width: 35,
    height: 35,
    margin: '0 16px',
  },
  notificationList: {
    width: 250,
    maxHeight: 300,
    overflow: 'auto',
  },
};

