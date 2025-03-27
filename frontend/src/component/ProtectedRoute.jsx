// filepath: c:\Users\Avinash\Desktop\Dev\employee\frontend\src\component\ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('token');
    return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;