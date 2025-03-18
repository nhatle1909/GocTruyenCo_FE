import {
    Box, Button, FormControl, IconButton, InputLabel, MenuItem,
    Pagination, Paper, Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField, Typography,
    useMediaQuery, useTheme, Tabs, Tab
} from "@mui/material";
import { useParams } from "react-router-dom";
import { styles } from "../Style/DashboardStyle";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useRef, useState } from "react";
import { ComicModel, GetComicByIdAPI } from "../../../model/ComicModel";
import { ComicChapterModel, GetComicChapterPagingAPI } from "../../../model/ComicChapterModel";
import { TabPanel } from "../../../components/TabPanel";

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     {children}
//                 </Box>
//             )}
//         </div>
//     );
// }

export const ComicChapterCreate = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { comicId } = useParams();
    const fileOpenRef = useRef<HTMLInputElement>(null);
    const [tabValue, setTabValue] = useState(0);

    const [pageSize, setPageSize] = useState(5);
    const [skip, setSkip] = useState(1);
    const RowsPerPage = ["5", "10", "15"];
    const [Comic, setComic] = useState<ComicModel>();
    const [ComicChapterList, SetComicChapterList] = useState<ComicChapterModel[]>([]);
    const [chapterImageList, setChapterImageList] = useState<File[]>([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchComicById = async () => {
            const response = await GetComicByIdAPI(comicId);
            await setComic(response);
        }
        fetchComicById();
    }, [comicId]);

    useEffect(() => {
        const fetchComicChapter = async () => {
            const response = await GetComicChapterPagingAPI(comicId, pageSize, skip, "");
            await SetComicChapterList(response);
        }
        fetchComicChapter();
    }, [comicId, pageSize, skip]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setChapterImageList(filesArray);

            // Create preview URLs
            const previewUrls = filesArray.map(file => URL.createObjectURL(file));
            setImagePreviewUrls(previewUrls);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={style.container}>
            <Box component="form" display={'flex'} flexDirection={'row'} gap={3}>
                <Paper sx={style.comicImage} elevation={3}>
                    <Box
                     
                        component="img"
                        sx={style.image}
                        src={Comic !== undefined ? Comic.themeURL : ""}
                    />
                    <Typography sx={style.comicTitle}>
                        {Comic !== undefined ? Comic.name : ""}
                    </Typography>
                </Paper>
                <Box sx={style.mainContentRightSide}>
                <Paper component="form" elevation={3} sx={[styles.tabBar(theme, isMobile),{marginLeft:'2%'}]}>
                    <Tabs
                        orientation={isMobile ? 'vertical' : 'horizontal'}
                        variant="fullWidth"
                        sx={styles.tabs(theme,isMobile)}
                        value={tabValue}
                        onChange={handleTabChange}

                    >
                        <Tab
                            label="Chapter List"
                        // sx={style.tab}
                        />
                        <Tab
                            label="Create New Chapter"
                        // sx={style.tab}
                        />
                    </Tabs>
                </Paper>
                <Box sx={{}}>
                <TabPanel value={tabValue} index={0}>
                    <TableContainer component={Paper} elevation={2} sx={style.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={style.tableHeader}>Chapter Number</TableCell>
                                    <TableCell sx={style.tableHeader}>Title</TableCell>
                                    <TableCell sx={style.tableHeader}>Created Date</TableCell>
                                    <TableCell sx={style.tableHeader}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ComicChapterList.map((chapter) => (
                                    <TableRow
                                        key={chapter.id}
                                        sx={style.tableRow}
                                    >
                                        <TableCell>{chapter.chapterNumber}</TableCell>
                                        <TableCell>{chapter.title}</TableCell>
                                        <TableCell>{new Date(chapter.createDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={style.actionButton}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Box sx={style.createChapterForm}>
                        <TextField
                            label="Chapter Title"
                            variant="outlined"
                            sx={styles.inputField(theme,isMobile )}
                        />
                        <IconButton
                            // variant="contained"
                            onClick={() => fileOpenRef.current?.click()}
                         
                            sx={style.uploadButton}
                        >
                            <AddPhotoAlternateIcon sx={{width:30,height:30}} />
                        </IconButton>
                        <input
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            ref={fileOpenRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />

                  
                    </Box>
                    <Box sx={style.imagePreviewGrid}>
                            {imagePreviewUrls.map((url, index) => (
                                <Paper
                                    key={index}
                                    elevation={3}
                                    sx={style.imagePreviewContainer}
                                >
                                    <Box
                                        component="img"
                                        src={url}
                                        sx={style.previewImage}
                                    />
                                </Paper>
                            ))}
                        </Box>
                </TabPanel>
                </Box>
                </Box>
            </Box>
        </Box>
    );

}

const style = {
    container: {
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#f5f5f5'
    },
    comicImage: {
        marginLeft:2,
        marginTop:1.5,
        width: 300,
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'white'
    },
    image: {
        width: '100%',
        height: 400,
        objectFit: "cover",
    },
    comicTitle: {
        margin: 2,
        width: '90%',
        color: 'text.primary',
        border: '1px solid #e0e0e0',
        padding: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontWeight: 'medium'
    },
    mainContentRightSide: {
        display:'flex',
        flexDirection:'column',
        width:'calc(95% - 300px)',
        overflow: 'hidden',
    },
    tabHeader: {
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: '#f8f8f8'
    },
    tabs: {
        '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main',
            height: 3
        }
    },
    tab: {
        fontWeight: 'medium',
        '&.Mui-selected': {
            color: 'primary.main'
        }
    },
    tableContainer: {
        // margin: 1,
        // border: '1px solid #e0e0e0',
        // borderRadius: 1
    },
    tableHeader: {
        fontWeight: 'bold',
        bgcolor: '#f8f8f8'
    },
    tableRow: {
        '&:hover': {
            bgcolor: '#f5f5f5'
        }
    },
    actionButton: {
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none'
        }
    },
    createChapterForm: {
        display: 'flex',
        flexDirection: 'row',
      
        // gap: 3,
        // padding: 3
    },
    textField: {
        width:'70%',
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'primary.main',
            }
        }
    },
    uploadButton: {
        width: 'fit-content',
        // px: 3,
        // py: 1.5,
        marginLeft:'2%',
        
        color:'#432571',
        border:'1px solid #432571',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none'
        }
    },
    imagePreviewGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 2,
        marginTop: 2
    },
    imagePreviewContainer: {
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid #e0e0e0'
    },
    previewImage: {
        width: '100%',
        height: 280,
        objectFit: 'fit',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
};
