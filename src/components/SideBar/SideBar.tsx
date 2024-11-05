import { useLocation, useNavigate } from 'react-router-dom';
import { Box, MenuItem, Typography } from '@mui/material';
import { DoubleArrow } from '@mui/icons-material';
import './sidebar.css'
import { routes } from '../../constants/route.constant';

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box className="sidebar-root">
            {routes?.map((item) => {
                const isSelected = location.pathname.includes(item.route);
                return (
                    <MenuItem onClick={() => navigate(item.route)} sx={{ padding: '10px 40px' }} key={item.title}>
                        <Typography variant="body1" fontWeight={isSelected ? 'bold' : 'inherit'} sx={{
                            display: 'flex', gap: 1, alignItems: 'center'
                        }}>
                            {isSelected ? <DoubleArrow sx={{ fontSize: 15 }} /> : null} {item.title}
                        </Typography>
                    </MenuItem>
                )
            })}
        </Box>
    )
}

export default SideBar
