import { createTheme, alpha } from '@mui/material/styles';

// Color palette
const colors = {
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1e40af',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#4f46e5',
    light: '#818cf8',
    dark: '#3730a3',
    contrastText: '#ffffff',
  },
  success: {
    main: '#059669',
    light: '#34d399',
    dark: '#065f46',
    contrastText: '#ffffff',
  },
  error: {
    main: '#dc2626',
    light: '#f87171',
    dark: '#991b1b',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#d97706',
    light: '#fbbf24',
    dark: '#92400e',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0284c7',
    light: '#38bdf8',
    dark: '#075985',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Typography scale
const typography = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
  },
};

// Common component styles
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px 16px',
        transition: 'all 0.2s ease',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          transform: 'translateY(-1px)',
        },
      },
      outlined: {
        '&:hover': {
          transform: 'translateY(-1px)',
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(colors.grey[500], 0.04),
          },
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: `0 1px 3px ${alpha(colors.grey[900], 0.1)}, 0 1px 2px ${alpha(colors.grey[900], 0.06)}`,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
      },
    },
  },
};

// Create theme variants
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    grey: colors.grey,
    background: {
      default: colors.grey[100],
      paper: '#ffffff',
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
    },
  },
  typography,
  components,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    grey: colors.grey,
    background: {
      default: colors.grey[900],
      paper: colors.grey[800],
    },
    text: {
      primary: colors.grey[100],
      secondary: colors.grey[400],
    },
  },
  typography,
  components,
});