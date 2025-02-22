import { useEffect, useState } from 'react';
import {
  Box, Paper,
  TextField, FormControl, InputLabel, Select, MenuItem, Tooltip,
  IconButton, Pagination, useTheme, useMediaQuery
} from '@mui/material';
import {
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { CountPageAsync, GetAccountPaging } from '../../model/AccountModel';
import { DataTable } from '../../components/Table';

  export const Account = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [count,setCount] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [skip, setSkip] = useState(1);
  const [searchFields, setSearchFields] = useState(["Email"]);
  const [searchValues, setSearchValues] = useState([""]);
  const [sortBy, setSortBy] = useState('Username');
  const [sortAsc, setSortAsc] = useState(true);
  const [isSearch, setIsSearch] = useState(true);
  const RowsPerPage = ["5","10","15"];
  const columns = ["Email","Username","Created At"];
  const actions = [{
    label:'Test',
    onClick : () => console.log("Test")
  },
  {
    label:'Delete',
    onClick : () => console.log("Delete")
  },
]
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const AccountResponse = await GetAccountPaging(searchFields, searchValues, sortBy, sortAsc, pageSize, skip, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlZmE1ZjFmNC1iMzI3LTQ3YjctODA5My0zZjczZjQxOWE2ODciLCJyb2xlIjoiQWRtaW4iLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImVtYWlsIjoic3RyaW5nQGdtYWlsLmNvbSIsIm5iZiI6MTczOTk3MzA2MCwiZXhwIjoxNzQwMDE2MjYwLCJpYXQiOjE3Mzk5NzMwNjAsImlzcyI6IkdvY1RydXllblRyYW5oIiwiYXVkIjoiR29jVHJ1eWVuVHJhbmgifQ.r8IoTTjRvZInDgSu6PBhYw235Cev-6bFJvdV-8cbJ-M");
      const CountResponse = await CountPageAsync(searchFields,searchValues,pageSize,"");
      await setCount(CountResponse);
      await setData(AccountResponse);
      setIsLoading(false);
    };
    fetch();
  }, [isSearch, skip, pageSize])
  console.table(data)
  return (
        <Box sx={styles.content}>
          <Paper component="form" elevation={3} sx={styles.searchBar(theme, isMobile)}>
            <TextField sx={styles.inputField(isMobile)} label="Search here" variant="outlined" size="small" fullWidth value={searchValues} onChange={(e) => setSearchValues([e.target.value.toString()])}  onKeyDown={(e) => {if(e.key === 'Enter') setIsSearch(!isSearch)}}/>
            <FormControl sx={styles.selectBox(isMobile)} size="small">
              <InputLabel>Search by</InputLabel>
              <Select value={searchFields} label="Search by" onChange={(e) => setSearchFields([e.target.value.toString()])} >
                <MenuItem value="Username">Username</MenuItem>
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="CreatedDate">Created At</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={styles.selectBox(isMobile)} size="small">
              <InputLabel>Sort by</InputLabel>
              <Select value={sortBy} label="Sort by" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="Username">Username</MenuItem>
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="CreatedDate">Created At</MenuItem>
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
          </Paper>
          <Paper elevation={3} sx={styles.tablePaper}>
            <DataTable header={columns} data={data} actions={actions} />
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
  );
};
 const styles = {
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
    border: '1px solid #ADD8E6'
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
  }
};