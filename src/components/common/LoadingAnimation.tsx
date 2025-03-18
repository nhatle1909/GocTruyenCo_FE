import { Box, useTheme } from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { keyframes } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';
export const LoadingAnimation = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const spin = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `;

    const style = {
        outerBox: {
        
            display: 'flex',
            width:30,
            height:30,
            alignItems: 'center',
            justifyContent: 'center',
            animation: `${spin} 2s linear infinite`,
            transition: 'transform 0.5s ease-in-out',

        },
        hourglassIcon: {
            fontSize: 40,
            color: isDarkMode ? 'white' : 'black',
        },
    };

    return (
        <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Box sx={style.outerBox}>
            <RefreshIcon sx={{ ...style.hourglassIcon, transform: 'rotate(180deg)' }} />
        </Box>
        </Box>
    );
};