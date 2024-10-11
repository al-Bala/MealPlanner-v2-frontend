import {PlanDay} from "./PlanDay.tsx";
import {useNavigate} from "react-router-dom";
import {Profile} from "../../models/userModels.ts";

export const PlanHistory = ({profile}: {profile: Profile}) => {
    const navigate = useNavigate();

    return (
      <>
          {profile.plans.map((plan, planIndex) =>
              <div key={planIndex}>
                  <h3>Plan: {planIndex + 1}</h3>
                  <PlanDay plan={plan}/>
                  <button onClick={() => navigate('/grocery-list')} className="grocery-button">
                      Grocery list
                  </button>
              </div>
          )}
      </>
    );
}