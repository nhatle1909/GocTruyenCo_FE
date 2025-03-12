export const styles = {
    content: {
      backgroundColor: '#f3f3f3',
      width: '85%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'flex-end'
    },
    searchBar: (theme: any, isMobile: boolean) => ({
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: theme.spacing(1),
      padding: 1.5,
      borderRadius: 2,
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
      width: isMobile ? "95%" : 'auto',
      maxWidth: { sm: '80%', md: '70%', lg: '60%' },
      margin: isMobile ? "2%" : "1%",
      marginBottom: theme.spacing(3),
      // border: '1px solid #ADD8E6'
    }),
    inputField: (isMobile: boolean) => ({
      width: isMobile ? "100%" : '30%',
      flexGrow: 1,
    }),
    selectBox: (isMobile: boolean) => ({
      width: isMobile ? "100%" : 'auto',
      minWidth: '20%',
      flexGrow: isMobile ? 1 : 0,
    }),
    iconBox: (theme: any, isMobile: boolean) => ({
      display: 'flex',
      flexDirection: 'row',
      gap: theme.spacing(1),
      alignSelf: isMobile ? 'flex-start' : 'center',
    }),
    tablePaper: {
      backgroundColor: 'white',
      width: 'auto',
      maxWidth: '95%',
      borderRadius: 2,
      height: 'auto',
      overflowY: 'auto',
      margin: "0 1% 3% 1%",
      padding: 2,
    },    tabBar: (theme: any, isMobile: boolean) => ({
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: theme.spacing(0.5),
        padding: theme.spacing(1),
        borderRadius: 1,
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
        width: isMobile ? "85%" : 'auto',
        maxWidth: { sm: '75%', md: '60%', lg: '25%' },
        margin: isMobile ? "2%" : "1%",
        marginLeft: isMobile ? "8%" : "1%",
        marginBottom: theme.spacing(2),
        // border: '1px solid #ADD8E6'
    }),
    tabs: (isMobile: boolean) => ({
        display: 'flex',
        width: '100%',
        flexDirection: isMobile ? 'column' : 'row',
        minHeight: 'unset',
        '& .MuiTab-root': {
            minHeight: '40px',
            padding: '6px 12px',
            fontSize: '0.7rem',
        },
    }),
  };