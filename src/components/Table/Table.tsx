import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table as MuiTable, Theme, SxProps } from '@mui/material'
import React from 'react';
import { Header } from '../../utils/founds.utils';
import { capitalizeString } from '../../utils/common.utils';

interface ITableProps {
    data: any[]
    headers: Header[];
    tableContainerSX: SxProps<Theme> | undefined;
}

const Table: React.FC<ITableProps> = ({ data, headers, tableContainerSX }) => {
    return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto', maxHeight: 600, height: '100%', ...tableContainerSX }}>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        {headers?.map((header) => (
                            <TableCell
                                hidden={header?.hidden ?? false}
                                align={header?.align ?? 'left'}
                            >
                                {capitalizeString(header.id)}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ maxHeight: 550 }}>
                    {data?.length > 0 ? data.map((row) => (
                        <TableRow key={`${(Math.random() * 999 + 1)}`}>
                            {headers.map((header) => (
                                <TableCell
                                    key={`${row[header?.id]} ${Math.random() * 99}`}
                                    variant="body"
                                    hidden={header?.hidden}
                                    align={header?.align}
                                >
                                    {row[header?.id]}
                                </TableCell>
                            ))}
                        </TableRow>
                    )) : null}
                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}

export default Table
