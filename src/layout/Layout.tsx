
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import './layout.css'
import { Box } from '@mui/material';

const Layout = () => (
    <Box className='root-layout'>
        <Header />
        <Box className='layout-content'>
            <SideBar />
            <Box className='outlet'>
                <Outlet />
            </Box>
        </Box>
    </Box>
);
export default Layout;
