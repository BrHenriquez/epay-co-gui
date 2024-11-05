import { Button as MuiButton, ButtonProps } from '@mui/material';

interface IButtonProps extends ButtonProps {
    isLoading?: boolean
    btType: 'primary' | 'secondary'
}

const Button = (props: IButtonProps) => {
    const colorScheme = {
        backGround: '#fb631d',
        color: '#fff',
        hover: "#000"
    }

    if (props?.btType === 'secondary') {
        colorScheme.backGround = '#000'
        colorScheme.color = '#fff'
        colorScheme.hover = '#fb631d'
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
            {props.children}
        </MuiButton >
    )
}

export default Button
