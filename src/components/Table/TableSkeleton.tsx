import {
    Table,
    TableBody,
    TableContainer,
    Paper,
    Skeleton,
    Typography,
    TableRow,
    TableCell,
    Box,
} from '@mui/material';
import React from 'react';
import { Header } from '../../utils/founds.utils';
import { capitalizeString } from '../../utils/common.utils';

const rows = Array(5).fill(<div />);

interface ICustomTableProps {
    headers: Header[]
}

const CustomTableSkeleton: React.FC<ICustomTableProps> = (props) => {
    const { headers } = props;
    return (
        <Paper>

            <TableContainer sx={{
                overflowX: 'auto',
                maxHeight: 600, zIndex: 1,
                position: 'relative',
            }}>
                <Box
                    sx={{
                        zIndex: 2,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        maxHeight: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="h6" align='center'>None to display</Typography>
                </Box>
                <Table stickyHeader aria-label="sticky table">
                    <TableRow>
                        {headers?.map((header: Header) => (
                            <TableCell
                                hidden={header?.hidden ?? false}
                                align={header?.align ?? 'left'}
                            >
                                {capitalizeString(header.id)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableBody
                        sx={{
                            maxHeight: 600,
                            zIndex: 1,
                            position: 'relative',
                        }}
                    >
                        {rows.map(() => (
                            <TableRow key={`${(Math.random() * 999 + 1)}`}>
                                {headers.map((header: Header) => (
                                    <TableCell
                                        key={Math.random() * 99}
                                        align={header?.align}
                                        hidden={header?.hidden}
                                        variant="body"
                                    >
                                        <Skeleton variant="rectangular" width="100%" height={30} animation={false} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
};

export default CustomTableSkeleton;
