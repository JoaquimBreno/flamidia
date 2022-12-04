import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isLogin } from '../utils';

function PrivateRoute() {
    const auth = isLogin();
    return auth ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;