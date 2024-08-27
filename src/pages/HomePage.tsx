import {Link} from 'react-router-dom';
import useAuth from "../features/authentication/hooks/useAuth.ts";
import useInactivityTracker from "../features/authentication/hooks/useInactivityTracker.ts";

export const HomePage = () => {
    const {auth} = useAuth();
    const { inactiveTime } = useInactivityTracker();

    return (
        <div>
            <h2>Meal Planner</h2>
            <p>Inactive time: {inactiveTime}</p>
            <Link to="/profile">
                <button>Profile</button>
            </Link>
            <Link to="/generator">
                <button>Generate Plan</button>
            </Link>
            <div>
                User: {auth.username}
            </div>
        </div>
    );
};
