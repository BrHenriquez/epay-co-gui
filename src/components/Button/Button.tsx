import { Button as MuiButton, ButtonProps, CircularProgress } from '@mui/material';
import colors from '../../utils/colors';

interface IButtonProps extends ButtonProps {
    isLoading?: boolean
    btType: 'primary' | 'secondary'
}

const Button = (props: IButtonProps) => {
    const colorScheme = {
        backGround: colors.primary,
        color: '#fff',
        hover: colors.secondary
    }

    if (props?.btType === 'secondary') {
        colorScheme.backGround = colors.secondary
        colorScheme.color = '#fff'
        colorScheme.hover = colors.primary
    }

    return (
        <MuiButton
            {...props}
            sx={{
                background: colorScheme.backGround,
                borderRadius: 10,
                ':hover': {
                    background: colorScheme.hover,
                },
                color: colorScheme.color,
                ...(props?.sx ? props.sx : {})
            }}
        >
            {!props?.isLoading ? props.children : <CircularProgress size={25} sx={{ color: 'white' }} />}
        </MuiButton >
    )
}

export default Button
