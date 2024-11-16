import {Link} from 'react-router-dom';
import "../assets/css/Home.css"
import {t} from "i18next";

export const HomePage = () => {
    // const { inactiveTime } = useInactivityTracker();

    return (
        <div className="home-section">
            <h2>Meal Planner</h2>
            <div className="home-msg">
                <p>{t('homePageMsg')}:</p>
            </div>
            <Link to="/generator">
                <button className="home-generator-button">{t('generateButton')}</button>
            </Link>
            {/*<p>Inactive time: {inactiveTime}</p>*/}
        </div>
    );
};
