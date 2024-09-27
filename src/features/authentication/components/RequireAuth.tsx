import useAuth from "../hooks/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    // const username = Cookies.get('username');

    return (
        auth.userId
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace/>    // allows back to previous page
    );
}

export default RequireAuth;