import { Paper } from "@mui/material"
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value : number;
}
export function TabPanel ( props:TabPanelProps) {
    const { children, value, index, ...other } = props;
    if (value === index) 
    return (
        <Paper elevation={3} sx={styles.tabPanel} >
            {children}
        </Paper>
    )
    else return null;
}
const styles = ({
    tabPanel:{
        backgroundColor: 'white',
        width: 'auto',
        maxWidth: '95%',
        borderRadius: 2,
        height: 'auto',
        overflowY: 'auto',
        margin: "0 1% 3% 1%",
        padding: 2,
    }
})