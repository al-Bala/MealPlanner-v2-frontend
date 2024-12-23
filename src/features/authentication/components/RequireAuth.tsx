import useAuth from "../hooks/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth.username
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace/>    // allows back to previous page
    );
}

export default RequireAuth;