import { Box, Paper, useMediaQuery, useTheme, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, FormControl, InputLabel, Select, Pagination, MenuItem, Tooltip, IconButton, TextField, List, ListItem, Grid2, Typography, Button } from "@mui/material"
import {  useEffect, useState } from "react";

import { styles } from "../Style/DashboardStyle";
import { ComicModel, CountPageComicAPI, GetComicPagingAPI } from "../../../model/ComicModel";

import { ExpandableCategoryList } from "../../../components/ExpandableBox";
import { cleanStringArray, stringArrayToString } from "../../../utils/Utils";
import {
    KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
    KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export const ComicSearch = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [data, setData] = useState<ComicModel[]>([]);
    const [count, setCount] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [skip, setSkip] = useState(1);
    const [searchFields, setSearchFields] = useState(["Name", "Status", "CategoryId"]);
    const [searchValue, setSearchValues] = useState(["", "", " "]);
    const [sortBy, setSortBy] = useState('Name');
    const [sortAsc, setSortAsc] = useState(true);
    const [isSearch, setIsSearch] = useState(true);
    const RowsPerPage = ["5", "10", "15"];
   
    const [categoryStringArray, setCategoryStringArray] = useState([""]);
    const updateSearchValue = async (index: number, newValue: string) => {
        try {
            await setSearchValues(values => values.map((oldValue, i) => i === index ? newValue : oldValue));
        }
        catch (error) {
            console.log(error)
        }
    }
    const updateCategoryString = async (oldValue: string, newValue: string) => {
        const index = categoryStringArray.indexOf(oldValue);
        if (index > -1) {
            categoryStringArray.splice(index, 1, newValue);
        } else {
            categoryStringArray.push(newValue);
        }
    }
    const navigateComicDetail = (comicId: string) => {
        navigate(`/admin/comic/${comicId}`);
    }
    useEffect(() => {
        const fetchComicData = async () => {
            try {
                searchValue[2] = stringArrayToString(cleanStringArray(categoryStringArray));
                const response = await GetComicPagingAPI(searchFields, searchValue, sortBy, sortAsc, pageSize, skip, "");

                const CountResponse = await CountPageComicAPI(searchFields, searchValue, pageSize, "");
                setData(response);
                setCount(CountResponse);

            } catch (error) {
                console.log(error);
            }
        }
        fetchComicData();
    }, [isSearch, skip, pageSize])
    return (
        <Box>
            <Paper component="form" elevation={3} sx={style.searchBox(theme, isMobile)}>
                <Box sx={[styles.searchBar(theme, isMobile), { borderRadius: 0, boxShadow: 0 }]}>
                    <TextField sx={styles.inputField(isMobile)} label="Search by title" variant="outlined" size="small" fullWidth
                        value={searchValue[0]}
                        onChange={(e) => updateSearchValue(0, e.target.value.toString())} />
                    <FormControl sx={styles.selectBox(isMobile)} size="small">
                        <InputLabel>Status</InputLabel>
                        <Select value={searchValue[1]} label="Status" onChange={(e) => updateSearchValue(1, e.target.value.toString())} >
                            <MenuItem value=" ">All</MenuItem>
                            <MenuItem value="InProgress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Dropped">Dropped</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={styles.selectBox(isMobile)} size="small">
                        <InputLabel>Sort by</InputLabel>
                        <Select value={sortBy} label="Sort by" onChange={(e) => setSortBy(e.target.value)}>
                            <MenuItem value="Name">Title</MenuItem>
                            <MenuItem value="Upload Date">Upload Date</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={styles.iconBox(theme, isMobile)}>
                        <Tooltip title={sortAsc ? "Sort Descending" : "Sort Ascending"}>
                            <IconButton color='primary' onClick={() => setSortAsc(!sortAsc)}>
                                {sortAsc ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Search">
                            <IconButton color='primary' onClick={() => setIsSearch(!isSearch)}><SearchIcon /></IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box>
                    <ExpandableCategoryList onClick={(oldValue, newValue) => updateCategoryString(oldValue, newValue)} />
                </Box>
            </Paper>
            <Paper elevation={3} sx={style.tabPanel} >

                <TableContainer>
                    <Table sx={{ width: '100%', borderBottom: '1px solid black' }}>
                        <TableHead>
                            <TableRow >
                                <TableCell component="th" scope="row">Title</TableCell>
                                <TableCell component="th" scope="row">Description</TableCell>
                                <TableCell component="th" scope="row">Category</TableCell>
                                <TableCell component="th" scope="row">Uploader</TableCell>
                                <TableCell component="th" scope="row">Chapters</TableCell>
                                <TableCell component="th" scope="row">Status</TableCell>
                                <TableCell component="th" scope="row">Upload Date</TableCell>
                                <TableCell component="th" scope="row">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data !== null ? (
                                data.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th"  scope="row"><Typography sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>{row.name}</Typography></TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{row.categoryName.join(" | ")}</TableCell>
                                        <TableCell align="left">{row.uploaderName}</TableCell>
                                        <TableCell align="left">{row.chapters}</TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="left">{row.createdDate}</TableCell>
                                        <TableCell align="left">
                                            <Button size="small" color="primary" variant="contained" sx={{ marginRight: 1 }}
                                                  onClick={() => navigateComicDetail(row.id)}>Add new chapter</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell colSpan={3} align="center">No data available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1%' }}>
                    <FormControl sx={[styles.selectBox(isMobile), { marginRight: '1%' }]} size="small">
                        <InputLabel>Rows per page</InputLabel>
                        <Select value={pageSize} label="Rows per page" onChange={(e) => setPageSize(Number(e.target.value.toString()))}>
                            {RowsPerPage.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Pagination variant="outlined" color="primary" count={count} page={skip} onChange={(e, page) => { setSkip(page) }} />
                </Box>
            </Paper>
        </Box>
    )

}
const style = ({
    tabPanel: {
        backgroundColor: 'white',
        width: 'auto',
        maxWidth: '95%',
        borderRadius: 2,
        height: 'auto',
        overflowY: 'auto',
        margin: "0 1% 3% 1%",
        padding: 2,
    },
    searchBox: (theme: any, isMobile: boolean) => ({
        display: 'flex',
        flexDirection: 'column',
        width: isMobile ? "95%" : 'auto',
        maxWidth: { sm: '80%', md: '70%', lg: '60%' },
        margin: isMobile ? "2%" : "1%",
        marginBottom: theme.spacing(3),
    })
})