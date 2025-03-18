import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Popover,
  Autocomplete,
  TextField,
  Stack,
  Link,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  List,
  ListItem
} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { ThemeContext } from '../../context/ThemeContext';
import { Notification } from '../Notification';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { LoginAPI } from '../../model/AuthModel';
import { ComicModel, GetComicPagingAPI } from '../../model/ComicModel';
import { useAuthStore } from '../../store/authStore';

const navigationItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Advance Search', icon: <MenuBookIcon />, path: '/browse' },
  { text: 'Forum', icon: <ForumIcon />, path: '/forum' },
  // { text: 'Popular', icon: <WhatshotIcon />, path: '/popular' },
];

export const MainHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const { toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [searchValue, setSearchValue] = useState<ComicModel>();
  const [searchOptions, setSearchOptions] = useState<ComicModel[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const { setToken, clearToken, token, isAuthenticated } = useAuthStore();
  
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

 
  const onLogOut = () => {
    setIsLoggedIn(false);
    clearToken();
  }

  const onLoginFormClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    try {
      const response = await LoginAPI(loginForm.email, loginForm.password);
      if (response?.token) {
        setToken(response.token);
        setAnchorEl(null);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  useEffect(() => {
    const keepLoggedIn = () => {
      console.log(isAuthenticated, token);
      if (token) {
        setIsLoggedIn(true);
      }
    }
   keepLoggedIn();
  }, []);

  useEffect(() => {
    const fetchComicSearchOptions = async () => {
      try {
        const response = await GetComicPagingAPI(["Name"], [searchValue !== undefined ? searchValue.name : ""], "Name", true, 5,1);
        setSearchOptions(response);
      } catch (error) {
        console.error('Error fetching search options:', error);
      }
    };
    fetchComicSearchOptions();
  }, [searchValue]);

  useEffect(() => {
    const initializeAuth = () => {
      const token = useAuthStore.getState().token;
      console.log("Mounted")
      if (token && !isAuthenticated) {
        setToken(token);
      }
};
    initializeAuth();
  }, []);

  return (
    <AppBar position="fixed" elevation={5} sx={styles.appBar}>
      <Toolbar sx={styles.leftSection}>
        <Typography variant="h6" component={RouterLink} to="/" sx={styles.logo}>
          GocTruyenTranh
        </Typography>
        <Box sx={styles.navigation}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              startIcon={item.icon}
              sx={{
                ...styles.navButton,
                ...(location.pathname === item.path && styles.activeNavButton),
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
      <Box sx={styles.rightSection}>
        <Autocomplete
          freeSolo={true}
          options={searchOptions}
          getOptionLabel={(option) => option.name}
          value={searchValue}
          onChange={(event, newValue) => setSearchValue(newValue)}
          sx={styles.searchBar}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search manga..."
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon sx={{ ml: 1, color: 'text.secondary', mr: 1 }} />
              }}
            />
          )}
        />
        <IconButton onClick={toggleTheme} sx={styles.iconButton}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {isLoggedIn ? (
          <Notification avatarURL={""} onLogout={() => onLogOut()} />
        ) : (
          <IconButton onClick={onLoginFormClick} sx={styles.iconButton}>
            <VpnKeyIcon />
          </IconButton>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box component="form" onSubmit={handleLoginSubmit} sx={styles.loginForm}>
            <Typography variant="h6" sx={styles.loginTitle}>
              Login
            </Typography>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="email">email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                label="email"
                value={loginForm.email}
                onChange={handleInputChange}
                error={!!errors.email}
              />
              {errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={handleInputChange}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.loginButton}
            >
              Login
            </Button>

            <Stack direction="row" justifyContent="space-between" sx={styles.loginFooter}>
              <Link component={RouterLink} to="/forgot-password" sx={styles.footerLink}>
                Forgot Password?
              </Link>
              <Link component={RouterLink} to="/register" sx={styles.footerLink}>
                Register
              </Link>
            </Stack>
          </Box>
        </Popover>
      </Box>
    </AppBar>
  );
};

const styles = {
  appBar: {
    backgroundColor: 'background.paper',
    top: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
    borderColor: 'divider',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: '64px',
  },
  leftSection: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 2,
  },
  logo: {
    textDecoration: 'none',
    color: 'primary.main',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginRight: 4,
    '&:hover': {
      color: 'primary.dark',
    },
  },
  navigation: {
    display: 'flex',
    gap: 1,
  },
  navButton: {
    color: 'text.primary',
    textTransform: 'none',
    borderRadius: 2,
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  activeNavButton: {
    color: 'primary.main',
    backgroundColor: 'action.selected',
    '&:hover': {
      backgroundColor: 'action.selected',
    },
  },
  rightSection: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 2,
  },
  searchBar: {
    width: '100%',
    maxWidth: 400,
    '& .MuiOutlinedInput-root': {
      borderRadius: 20,
      backgroundColor: 'background.paper',
      '&:hover': {
        backgroundColor: 'action.hover',
      },
    },
  },
  iconButton: {
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  loginForm: {
    padding: 3,
    width: 300,
  },
  loginTitle: {
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  loginButton: {
    mt: 2,
    mb: 2,
    py: 1,
    borderRadius: '8px',
  },
  loginFooter: {
    mt: 1,
  },
  footerLink: {
    fontSize: '0.875rem',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};