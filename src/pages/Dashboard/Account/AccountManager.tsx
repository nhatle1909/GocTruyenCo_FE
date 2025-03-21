import { useEffect, useState } from 'react';
import {
  Box, Paper,
  TextField, FormControl, InputLabel, Select, MenuItem, Tooltip,
  IconButton, Pagination, useTheme, useMediaQuery,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar
} from '@mui/material';
import {
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
  KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { AccountModel, CountPageAccountAsync, GetAccountPaging, RestrictAccount } from '../../../model/AccountModel';
import { styles } from '../Style/DashboardStyle';
import { LoadingAnimation } from '../../../components/common/LoadingAnimation';
export const Account = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [IsLoading,setIsLoading] = useState(true);

  const [data, setData] = useState<AccountModel[] | null>(null);
  const [count, setCount] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [skip, setSkip] = useState(1);
  const [searchFields, setSearchFields] = useState(["Email"]);
  const [searchValues, setSearchValues] = useState([""]);
  const [sortBy, setSortBy] = useState('Username');
  const [sortAsc, setSortAsc] = useState(true);
  const [isSearch, setIsSearch] = useState(true);
  const [trigger, setTrigger] = useState({ trigger: false, message: "" });
  const RowsPerPage = ["5", "10", "15"];
  const RestrictAccountAndSearch = async (accountId: string) => {
    const message = await RestrictAccount(accountId);
    setTrigger({ trigger: !trigger.trigger, message: message });
    setIsSearch(!isSearch);
  }
  useEffect(() => {
    const fetch = async () => {
      
      setIsLoading(true);
      try{
      const AccountResponse = await GetAccountPaging(searchFields, searchValues, sortBy, sortAsc, pageSize, skip);
      const CountResponse = await CountPageAccountAsync(searchFields, searchValues, pageSize);
      await setCount(CountResponse);
      await setData(AccountResponse);
      }
      catch{
        setData(null)
        setCount(1);
      }
      setIsLoading(false);
    };
    fetch();
  }, [isSearch, skip, pageSize])

  return (
    <Box sx={styles.content}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={setTrigger.bind(this, { trigger: false, message: "" })}
        open={trigger.trigger}
        message={trigger.message}
      />
      <Paper component="form" elevation={3} sx={styles.searchBar(theme, isMobile)}>
        <TextField sx={styles.inputField(theme,isMobile)} label="Search here" variant="outlined" size="small" fullWidth
          value={searchValues} onChange={(e) => setSearchValues([e.target.value.toString()])}
          onKeyDown={(e) => { if (e.key === 'Enter') setIsSearch(!isSearch) }} />
        <FormControl sx={styles.selectBox(theme,isMobile)} size="small">
          <InputLabel>Search by</InputLabel>
          <Select value={searchFields} label="Search by" onChange={(e) => setSearchFields([e.target.value.toString()])} >
            <MenuItem value="Username">Username</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="CreatedDate">Created At</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={styles.selectBox(theme,isMobile)} size="small">
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
        <TableContainer>
          <Table sx={{ width: '100%', borderBottom: '1px solid black' }}>
            <TableHead>
              <TableRow >
                <TableCell component="th" scope="row">Username</TableCell>
                <TableCell component="th" scope="row">Email</TableCell>
                <TableCell component="th" scope="row">Created At</TableCell>
                <TableCell component="th" scope="row">Is Restricted</TableCell>
                <TableCell component="th" scope="row">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsLoading ? (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> {/* Render a message or placeholder when data is empty or null */}
                  <TableCell colSpan={5} align="center"><LoadingAnimation/></TableCell> {/* Adjust colSpan as needed */}
                </TableRow>
              ):(
                <>
              {data && data.length > 0 ? (
                data.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{row.username}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.createdDate}</TableCell>
                    <TableCell align="left">{row.isRestricted.toString()}</TableCell>
                    <TableCell align="left">
                      <Button size="small" color="primary" variant="contained" sx={{ marginRight: 1 }}
                        onClick={() => RestrictAccountAndSearch(row.id)}>Restrict</Button>
                    </TableCell>
                  </TableRow>
                )
              )
              ) : (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> {/* Render a message or placeholder when data is empty or null */}
                  <TableCell colSpan={5} align="center">No Data Available</TableCell> {/* Adjust colSpan as needed */}
                </TableRow>
              )}
            </>)}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1%' }}>
          <FormControl sx={[styles.selectBox(theme,isMobile), { marginRight: '1%' }]} size="small">
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
