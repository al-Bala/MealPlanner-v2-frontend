import {PlanDay} from "./PlanDay.tsx";
import {useNavigate} from "react-router-dom";
import {Profile} from "../../models/userModels.ts";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {t} from "i18next";

export const PlanHistory = ({profile}: { profile: Profile }) => {
    const navigate = useNavigate();

    return (
        <>
            {profile.plans.map((plan, planIndex) =>
                <div className="one-plan-his-container" key={planIndex}>
                    <div className="plan-his-info">
                        <div className="info-box">
                            <RestaurantIcon/>
                            <span>2</span>
                        </div>
                        <div className="info-box">
                            <span className="diet">diet</span>
                        </div>
                    </div>
                    <div className="plan-his-box">
                        <PlanDay plan={plan}/>
                    </div>
                    <button onClick={() => navigate('/grocery-list')} className="grocery-button">
                        {t('groceryListButton')}
                    </button>
                </div>
            )}
        </>
    );
}