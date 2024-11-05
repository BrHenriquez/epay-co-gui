import { Alert, Box, CircularProgress, Grid2, Paper, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { registerClient } from '../service/client.service';
import { IClient } from '../types/client.type';
import Button from '../components/Button/Button';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: "",
    document: "",
    email: "",
    phone: "",
}

const formStateInitialState = {
    loading: false,
    success: false,
    error: false,
    message: ""
}

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Partial<IClient>>(initialState);
    const [formState, setFormState] = useState(formStateInitialState);

    useEffect(() => {
        const timer = setTimeout(() => {
            resetFormState()
        }, 10000);

        return () => {
            clearTimeout(timer)
        }
    }, [formState.error, formState.success])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetFormState = () => {
        setFormState(formStateInitialState)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        resetFormState();
        setFormState((prev) => ({ ...prev, loading: true }));
        try {
            const response = await registerClient(formData);
            if (response?.success) {
                setFormState((prev) => ({ ...prev, success: true, message: response.message }));
                setFormData(initialState)
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const errorMessage = error?.response?.data?.error;
                setFormState((prev) => ({ ...prev, error: true, message: errorMessage, loading: false }));
            } else {
                console.log(error)
                setFormState((prev) => ({ ...prev, error: true, loading: false }));
                console.error(error)
            }
        } finally {
            setFormState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <Box>
            <Typography variant="h4">Register a new client</Typography>
            <Paper sx={{ width: 600, display: 'flex', padding: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                label="Document"
                                name="document"
                                value={formData.document}
                                onChange={handleChange}
                                required
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid2>
                        <Grid2 size={12} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            {formState.success || formState.error ? <Alert severity={formState.success ? 'success' : 'error'}>{formState?.message}</Alert> : null}
                            <Button
                                variant="contained"
                                btType="primary"
                                type='submit'
                                sx={{
                                    background: '#fb631d',
                                    borderRadius: 10,
                                    minWidth: 250,
                                    maxWidth: 260,
                                    ':hover': {
                                        background: '#000',
                                    }
                                }}
                            >
                                {formState.loading ? <CircularProgress sx={{ color: 'white' }} size={25} /> : 'Register Client'}
                            </Button>
                            {formState.success ? (
                                <Button
                                    btType="secondary"
                                    variant='outlined'
                                    sx={{
                                        borderRadius: 10,
                                        minWidth: 250,
                                        maxWidth: 260,
                                    }}
                                    onClick={() => navigate('/home')}
                                >
                                    Go to all clients
                                </Button>
                            ) : null}
                        </Grid2>
                    </Grid2>
                </form>

            </Paper>
        </Box>
    )
}

export default Register
