import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/stores/authStore";

export default function ProtectedRouter({ allowedRoles }) {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    // Check role if specified
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to='/403' replace />;
    }

    return <Outlet />;
}
