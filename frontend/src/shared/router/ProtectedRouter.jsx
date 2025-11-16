import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouter({ allowedRoles }) {
    console.log(allowedRoles);

    // if (!allowedRoles) return <Navigate to='/403' replace /
    return <Outlet />
}
