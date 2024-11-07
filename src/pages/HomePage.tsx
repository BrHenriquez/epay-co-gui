import { BaseSyntheticEvent, useEffect, useState } from "react"
import { getAllClients, removeClient } from "../service/client.service";
import {
    Backdrop,
    Box,
    CircularProgress,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { Delete, MoreVert, Payment, Wallet } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import useClientContext from "../context/ClientContext";
import { mappClients } from "../utils/client.utils";
import CustomTableSkeleton from "../components/Table/TableSkeleton";
import { AllClientsHeader } from "../constatns/client.constat";
import { currencyFormat } from "../utils/common.utils";

const HomePage = () => {
    const navigate = useNavigate();
    const { clients, setClients } = useClientContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState<string | undefined>(undefined);

    const handleMenuOpen = (event: BaseSyntheticEvent, rowId: string | undefined) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(undefined);
    };

    useEffect(() => {
        fetchClients()
    }, []);

    const fetchClients = async () => {
        try {
            setIsLoading(true);
            const response = await getAllClients();
            if (response?.success) setClients(mappClients(response.data));
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false);
        }
    }

    const onRemoveClient = async (id: string) => {
        try {
            const response = await removeClient(id);
            if (response?.success) {
                setClients(clients.filter((client) => client._id !== id))
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 850, gap: 1, display: 'flex', flexDirection: 'column', padding: 1 }}>
            {isLoading && (
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Typography variant="h4">All Clients</Typography>
            <Box sx={{ maxWidth: 800 }}>
                {clients && clients?.length > 0 ? (
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
                                {clients.map((row) => {
                                    return (
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
                                            <TableCell align="center">{currencyFormat(row.balance ?? 0)}</TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={(e) => handleMenuOpen(e, row._id)}>
                                                    <MoreVert />
                                                </IconButton>
                                                <Menu
                                                    id={`menu-${row._id}`}
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl) && selectedRowId === row._id}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuList>
                                                        <MenuItem onClick={() => navigate(`/founds/${row._id}`)}>
                                                            <ListItemIcon>
                                                                <Wallet cursor="pointer" />
                                                            </ListItemIcon>
                                                            <ListItemText>
                                                                Add founds to {row.name}
                                                            </ListItemText>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => navigate(`/payment/${row._id}`)}>
                                                            <ListItemIcon>
                                                                <Payment cursor="pointer" />
                                                            </ListItemIcon>
                                                            <ListItemText>
                                                                Payment with confirmation code
                                                            </ListItemText>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => onRemoveClient(row._id ?? '')} sx={{ color: 'red' }}>
                                                            <ListItemIcon>
                                                                <Delete cursor="pointer" sx={{ color: 'red' }} />
                                                            </ListItemIcon>
                                                            <ListItemText>
                                                                Delete client
                                                            </ListItemText>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>)
                    : <CustomTableSkeleton headers={AllClientsHeader} />}
            </Box>
        </Box>
    )
}

export default HomePage
