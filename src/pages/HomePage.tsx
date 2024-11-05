import { useEffect, useState } from "react"
import { getAllClients } from "../service/client.service";
import { Backdrop, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { Wallet } from '@mui/icons-material'
import { IClient } from "../types/client.type";

const HomePage = () => {
    const [clients, setClients] = useState<IClient[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchClients()
    }, []);

    const fetchClients = async () => {
        try {
            setIsLoading(true);
            const response = await getAllClients();
            if (response?.success) setClients(response.data);
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 850, gap: 1, display: 'flex', flexDirection: 'column' }}>
            {isLoading && (
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Typography variant="h4">All Clients</Typography>
            <Box>
                {clients.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Document</TableCell>
                                    <TableCell align="left">Phone</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="center">Balance</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clients.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.document}</TableCell>
                                        <TableCell align="left">{row.phone}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="center">{row.balance}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={`Add founds to ${row.name}`}>
                                                <Wallet cursor="pointer" />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>)
                    : null}
            </Box>
        </Box>
    )
}

export default HomePage
