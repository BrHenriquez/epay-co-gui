import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from 'react-router-dom';
import Layout from '../layout/Layout';
import HomePage from '../pages/HomePage';
import Register from '../pages/Register';

const MainNavigator = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to="home" />} />
        </Route>
    ));
    return (
        <RouterProvider router={router} />
    )
}

export default MainNavigator
