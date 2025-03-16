import { SxProps } from '@mui/material';

export const transitions = {
  smooth: 'all 0.2s ease',
  smoothFast: 'all 0.15s ease',
  smoothSlow: 'all 0.3s ease',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};

export const flexCenter: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const flexBetween: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const flexColumn: SxProps = {
  display: 'flex',
  flexDirection: 'column',
};

export const hoverEffect: SxProps = {
  transition: transitions.smooth,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: shadows.md,
  },
};

export const cardStyle: SxProps = {
  borderRadius: 2,
  boxShadow: shadows.sm,
  bgcolor: 'background.paper',
  transition: transitions.smooth,
  '&:hover': {
    boxShadow: shadows.md,
  },
};

export const containerStyle: SxProps = {
  maxWidth: 'lg',
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4 },
};

export const gridContainer: SxProps = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
  },
};