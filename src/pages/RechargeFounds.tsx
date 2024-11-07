import { Box, darken, Grid2, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useClientContext from '../context/ClientContext';
import Table from '../components/Table/Table';
import { foundsHeaders } from '../utils/founds.utils';
import Button from '../components/Button/Button';
import { addFounds } from '../service/client.service';
import { currencyFormat } from '../utils/common.utils';

const options = ["10", "50", "100", "200", "250", "300"];

const RechargeFounds = () => {
    const { id } = useParams();
    const { clientSelected, updateClient, selectClient } = useClientContext();
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            selectClient(id)
        }
    }, [id])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setAmount(value === "" ? '' : value);
    };

    const onAddFounds = async () => {
        setIsLoading(true);
        try {
            if (!clientSelected) return
            const { document, phone } = clientSelected;
            const response = await addFounds({ document, phone, amount: Number(amount) });
            updateClient(response?.data, id)
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        } finally {
            setAmount("")
            setIsLoading(false);
        }
    }

    return (
        <Box sx={{ maxHeight: '90%' }}>
            <Paper sx={{ maxWidth: 700, width: '100%', minHeight: 500, maxHeight: '100%', height: '100%', padding: 3 }}>
                <Grid2 container sx={{ display: 'flex', rowGap: 2 }}>
                    <Grid2 size={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">{clientSelected?.name}'s Wallet</Typography>
                            <Typography variant="h6">{currencyFormat(clientSelected?.balance ?? 0) }</Typography>
                        </Grid2>
                        <TextField
                            type='number'
                            slotProps={{ input: { startAdornment: (<InputAdornment position='start' sx={{ mr: 0.5 }}>$</InputAdornment >) } }}
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            fullWidth
                            value={amount}
                            placeholder='0'
                            sx={{
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                            }}
                            onChange={(e) => handleChange(e)}
                        />
                        <Button
                            btType='primary'
                            fullWidth
                            onClick={onAddFounds}
                            isLoading={isLoading}
                        >
                            Add to wallet
                        </Button>
                    </Grid2>
                    <Grid2 size={12} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                        <Grid2 sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 4 }}>
                            {options.map((option) => {
                                const isSelected = Number(amount) === Number(option);;
                                return (
                                    <Box
                                        key={option}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            maxWidth: 130,
                                            flexBasis: '25%',
                                            height: 80,
                                            borderRadius: 2,
                                            boxShadow: isSelected ?
                                                'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' :
                                                'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                                            ":hover": {
                                                background: darken('#fff', 0.1)
                                            }
                                        }}
                                        onClick={() => setAmount(option)}
                                    >
                                        <Typography variant="body1" fontWeight="bold">
                                            {currencyFormat(Number(option))}
                                        </Typography>
                                    </Box>
                                )
                            })}
                        </Grid2>
                        <Grid2 size={12} sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
                            <Typography variant="body1" fontWeight="bold">
                                History
                            </Typography>
                            <Table
                                headers={foundsHeaders}
                                data={clientSelected?.balanceHistory?.map((found) => {
                                    const isExpense = found.type === 'expense';
                                    return {
                                        ...found,
                                        amount: (
                                            <Typography variant="body2" sx={{ color: isExpense ? 'orange' : 'green' }}>
                                                {isExpense ? '-' : '+'} {currencyFormat(found.amount)}
                                            </Typography>
                                        ),
                                        balance: currencyFormat(found.balance)
                                    }
                                }) ?? []}
                                tableContainerSX={{
                                    maxHeight: 400
                                }}
                            />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    )
}

export default RechargeFounds
