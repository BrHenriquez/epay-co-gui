
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import './layout.css'
import { Box } from '@mui/material';

const Layout = () => (
    <Box className='root-layout'>
        <Header />
        <Box className='layout-content'>
            <Outlet />
        </Box>
    </Box>
);
export default Layout;
