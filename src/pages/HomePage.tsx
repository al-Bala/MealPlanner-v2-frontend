import {Link} from 'react-router-dom';
import useAuth from "../features/authentication/hooks/useAuth.ts";
import useInactivityTracker from "../features/authentication/hooks/useInactivityTracker.ts";

export const HomePage = () => {
    const {auth} = useAuth();
    const { inactiveTime } = useInactivityTracker();
    // const {logout} = useApiAuth();

    return (
        <div>
            <h2>Meal Planner</h2>
            <p>Let's create your plan of recipes:</p>
            {/*<Link to="/profile">*/}
            {/*    <button>Profile</button>*/}
            {/*</Link>*/}
            <Link to="/generator">
                <button style={{backgroundColor: "#2c4f33", color: "white"}}>Generate Plan</button>
            </Link>
            {/*<button onClick={(e) => {*/}
            {/*    e.preventDefault();*/}
            {/*    logout("/");*/}
            {/*}}>*/}
            {/*    Sign out*/}
            {/*</button>*/}
            <div style={{marginTop: "5em"}}>
                User ID: {auth.userId}
                {/*User2: {auth.username}*/}
            </div>
            <p>Inactive time: {inactiveTime}</p>
        </div>
    );
};
