import {Link} from 'react-router-dom';
import useAuth from "../features/authentication/hooks/useAuth.ts";
import useInactivityTracker from "../features/authentication/hooks/useInactivityTracker.ts";
import {t} from "i18next";

export const HomePage = () => {
    const {auth} = useAuth();
    const { inactiveTime } = useInactivityTracker();

    return (
        <div>
            <h2>Meal Planner</h2>
            <p>{t('homePageMsg')}:</p>
            <Link to="/generator">
                <button style={{backgroundColor: "#2c4f33", color: "white"}}>{t('generateButton')}</button>
            </Link>
            <div style={{marginTop: "5em"}}>
                {t('userId')}: {auth.userId}
            </div>
            <p>Inactive time: {inactiveTime}</p>
        </div>
    );
};
