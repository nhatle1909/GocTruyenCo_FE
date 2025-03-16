import React from 'react';
import { Box, Paper, Typography, keyframes, useTheme } from '@mui/material';

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ComicItem = () => {
  const theme = useTheme();

  const styles = {
    paper: {
    animation: `${fadeInScale} 0.5s ease-out both`,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
      '& .comic-image': {
        transform: 'scale(1.05)',
      },
      '& .overlay': {
        opacity: 1,
      },
    },
    },
    imageBox: {
      position: 'relative',
      width: '100%',
      height: 320,
    overflow: 'hidden',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'objectfit',
        transition: 'transform 0.5s ease',
      },
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
              padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    title: {
      fontWeight: 700,
      fontSize: '1.1rem',
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(0.5),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    description: {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    overlayText: {
      color: 'white',
      fontWeight: 600,
      textAlign: 'center',
      padding: theme.spacing(2),
    },
};

  return (
    <Paper sx={styles.paper} elevation={1}>
      <Box sx={styles.imageBox}>
        <img
          className="comic-image"
          src="https://picsum.photos/id/244/500/300"
          alt="Comic Cover"
        />
        <Box className="overlay" sx={styles.overlay}>
          <Typography variant="body1" sx={styles.overlayText}>
            Click to View
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.content}>
        <Typography sx={styles.title}>
          Con Cò Cu Đen
        </Typography>
        <Typography sx={styles.description}>
          Den
        </Typography>
      </Box>
    </Paper>
  );
};