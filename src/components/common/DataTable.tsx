import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
interface TableProps {
    header: string[],
    data: any[],
    actions: Actions[],
}
interface Actions {
    label: string;
    onClick: (...args:any[]) => void;
}
export const DataTable: React.FC<TableProps> = ({ header, data, actions }) => {
    let jsonSchema = [""];
    if (  data !== null) {
     jsonSchema = Array.from(new Set(data.flatMap(Object.keys))).slice(1);
    }
    return (
        <TableContainer>
            <Table sx={{ width: '100%', borderBottom: '1px solid black' }}>
                <TableHead>
                    <TableRow > 
                        {header.map((item) => (
                            <TableCell component="th" scope="row">{item}</TableCell> 
                        ))}
                        <TableCell component="th" scope="row">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data !== null ? (
                        data.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {jsonSchema.map((property, index) => (
                                    <TableCell key={index}> {/* Key for cells (if needed) */}
                                        {row[jsonSchema[index]].toString()}
                                    </TableCell>
                                ))}
                                <TableCell align="left">
                                    {actions.map((action, index) => (
                                        <Button size="small" color="primary" variant="contained" sx={{ marginRight: 1 }} key={index} onClick={() => action.onClick()}>{action.label}</Button>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> {/* Render a message or placeholder when data is empty or null */}
                            <TableCell colSpan={3} align="center">No data available</TableCell> {/* Adjust colSpan as needed */}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
