import { Alert, Box, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import Button from '../components/Button/Button'
import useClientContext from '../context/ClientContext'
import { confirmPayment, initiatePayment } from '../service/client.service'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle } from '@mui/icons-material'
import { isAxiosError } from 'axios'
import { currencyFormat } from '../utils/common.utils'

const PaymentGenerator = () => {
    const { id } = useParams()
    const { clientSelected, selectClient } = useClientContext();
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [formState, setFormState] = useState<{
        isLoading: boolean,
        isSuccess: boolean,
        codeVerified: boolean,
        paymentError?: string,
        codeValidationError?: string,
    }>({ isLoading: false, isSuccess: false, codeVerified: false })
    const [sessionId, setSessionId] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            selectClient(id)
        }
    }, [id])

    useEffect(() => {
        return () => {
            setSessionId("");
            setFormState(({ isLoading: false, isSuccess: false, codeVerified: false }))
            setAmount(undefined)
        }
    }, [])

    const onHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value === "") {
            setAmount(undefined)
        } else {
            setAmount(Number(value))
        }
    }

    const onInitiatePayment = async () => {
        setFormState((prev) => ({ ...prev, isLoading: true }))
        try {
            if (clientSelected && clientSelected?.phone && clientSelected.document && amount) {
                const response = await initiatePayment({ amount, document: clientSelected.document, phone: clientSelected.phone });
                setSessionId(response?.data?.sessionId)
            }
        } catch (error) {
            console.error(error);
            if (isAxiosError(error) && error?.response) {
                setFormState((prev) => ({ ...prev, isLoading: false, paymentError: error.response?.data.error }))
            } else {
                console.error(error);
            }
        } finally {
            setFormState((prev) => ({ ...prev, isLoading: false }))
        }
    }

    const onConfirmPayment = async () => {
        setFormState((prev) => ({ ...prev, isLoading: true }))
        try {
            const response = await confirmPayment({ token: verificationCode, document: clientSelected?.document ?? '', sessionId, amount: amount ?? 0 });
            if (response?.success) {
                setFormState((prev) => ({ ...prev, codeVerified: true }))
            }
        } catch (error) {
            if (isAxiosError(error) && error?.response) {
                setFormState((prev) => ({ ...prev, isLoading: false, codeValidationError: error.response?.data.error }))
            } else {
                console.error(error);
            }
        } finally {
            setFormState((prev) => ({ ...prev, isLoading: false }))
        }
    }

    const handleVerificationCode = (value: string) => {
        if (value.length <= 6) {
            setVerificationCode(value)
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ maxWidth: 700, minWidth: 400, width: '100%', padding: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
                {!sessionId ? (
                    <>
                        <Typography variant="h5">Make a payment and confirm</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body1"> {clientSelected?.name}'s wallet</Typography>
                            <Typography variant="body1">{currencyFormat(clientSelected?.balance ?? 0)}</Typography>
                        </Box>
                        <TextField
                            type='number'
                            slotProps={{ input: { startAdornment: (<InputAdornment position='start' sx={{ mr: 0.5 }}>$</InputAdornment >) } }}
                            id="outlined-basic"
                            label="How much do you want to transfer?"
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
                            onChange={(e) => onHandleChange(e)}
                        />
                        {formState.paymentError ? <Alert severity='error'>{formState.paymentError} </Alert> : null}
                        <Button
                            btType='primary'
                            fullWidth
                            onClick={onInitiatePayment}
                            isLoading={formState.isLoading}
                        >
                            Initiate payment
                        </Button>
                    </>) : (
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: formState?.codeVerified ? 'center' : 'inherit' }}>
                        {!formState?.codeVerified ? (
                            <>
                                <Typography variant="h6">Code sent!</Typography>
                                <Typography variant="body2">The code was sent to your email: {clientSelected?.email}</Typography>
                                <Typography variant="body2">Please check your email to confirm the code and complete the payment.</Typography>
                                <TextField
                                    id="outlined-basic"
                                    label="Verification Code"
                                    variant="outlined"
                                    fullWidth
                                    value={verificationCode}
                                    placeholder='XXXXXX'
                                    onChange={(e) => handleVerificationCode(e.target.value)}
                                />
                                {formState.codeValidationError ? <Alert severity='error'>{formState.codeValidationError} </Alert> : null}
                                <Button
                                    btType='secondary'
                                    fullWidth
                                    onClick={onConfirmPayment}
                                    isLoading={formState.isLoading}
                                >
                                    Submit
                                </Button>
                            </>
                        ) :
                            <>
                                <Typography variant="h6">Code verified</Typography>
                                <CheckCircle sx={{ fontSize: 40, color: 'green' }} />
                                <Button
                                    btType='primary'
                                    fullWidth
                                    onClick={() => navigate('/home')}
                                    isLoading={formState.isLoading}
                                >
                                    Go to all clients
                                </Button>
                            </>
                        }
                    </Box>
                )}
            </Paper>
        </Box>
    )
}

export default PaymentGenerator
