import { Theme } from '@mui/material';
import { transitions} from '../../../styles/commonStyles';

export const styles = {
  content: (theme: Theme) => ({
    backgroundColor: theme.palette.background.default,
      width: '85%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    alignSelf: 'flex-end',
    transition: transitions.smooth,
    }),
  searchBar: (theme: Theme, isMobile: boolean) => ({
      display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
     borderRadius:2,
    boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
    width: isMobile ? "95%" : 'auto',
    maxWidth: { sm: '80%', md: '70%', lg: '60%' },
        margin: isMobile ? "2%" : "1%",
    marginBottom: theme.spacing(3),
    transition: transitions.smooth,
    border: `1px solid ${theme.palette.divider}`,
    }),
  inputField: (theme: Theme, isMobile: boolean) => ({
    width: isMobile ? "100%" : '30%',
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
        },
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
    },
  }),

  selectBox: (theme: Theme, isMobile: boolean) => ({
    width: isMobile ? "100%" : 'auto',
    minWidth: '20%',
    flexGrow: isMobile ? 1 : 0,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
    },
  }),

  iconBox: (theme: Theme, isMobile: boolean) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    alignSelf: isMobile ? 'flex-start' : 'center',
    '& .MuiIconButton-root': {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),

  tablePaper: (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
    maxWidth: '95%',
    borderRadius:  2,
    height: 'auto',
    overflowY: 'auto',
    margin: "0 1% 3% 1%",
    padding: theme.spacing(2),
    transition: transitions.smooth,
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiTableCell-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),

  tabBar: (theme: Theme, isMobile: boolean) => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
    width: isMobile ? "85%" : 'auto',
    maxWidth: { sm: '75%', md: '60%', lg: '25%' },
    margin: isMobile ? "2%" : "1%",
    marginLeft: isMobile ? "8%" : "1%",
    marginBottom: theme.spacing(2),
    transition: transitions.smooth,
    border: `1px solid ${theme.palette.divider}`,
  }),

  tabs: (theme: Theme, isMobile: boolean) => ({
    display: 'flex',
    width: '100%',
    flexDirection: isMobile ? 'column' : 'row',
    minHeight: 'unset',
    '& .MuiTab-root': {
      minHeight: '40px',
      padding: '6px 12px',
      fontSize: '0.7rem',
      color: theme.palette.text.primary,
      '&.Mui-selected': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
};
