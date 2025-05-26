import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function ProtectedRoutes() {
    const { user } = useContext(AuthContext); // Obtener el usuario desde el contexto
    console.log("ProtectedRoutes user:", user);

    if (!user || user.admin === false) {
        return <Navigate to="/" replace />;
    } else {
        return <Outlet />;
    }
}
