import useAuth from "../features/authentication/hooks/useAuth.ts";
import {useEffect, useState} from "react";
import useRefreshToken from "../features/authentication/hooks/useRefreshToken.ts";
import {Profile} from "../models/userModels.ts";
import {apiUser} from "../api/apiUser.ts";

export const ProfilePage = () => {
    const {auth} = useAuth();
    const refresh = useRefreshToken();
    const [profile, setProfile] = useState<Profile>({
        user: '',
        plans: [
            {
                days: [
                    {
                        date: '',
                        planned_day: [
                            {
                                type_of_meal: '',
                                recipeId: '',
                                recipeName: ''
                            }
                        ]
                    }
                ]
            }
        ]
    });

    useEffect(() => {
        apiUser().showProfile({userId: auth.userId, setProfile: setProfile});
    }, [auth.userId]);

    return (
        <>
            {/*<Users/>*/}
            <div>User: {auth.userId}</div>
            <div>Plan history:
                {profile.plans.length != 0 ?
                    profile.plans.map((plan, planIndex) => (
                        <div key={planIndex}>
                            <p>Plan: {planIndex + 1}</p>
                            {plan.days.map((day, dayIndex) => (
                                <div key={dayIndex}>
                                    <p>Day: {day.date}</p>
                                    {day.planned_day.map((recipe, recIndex) => (
                                        <div key={recIndex}>
                                            <p>Meal: {recipe.type_of_meal}</p>
                                            <p>Recipe: {recipe.recipeName}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button>Grocery list</button>
                        </div>
                    )) :
                    <p>Brak przepisów w historii</p>
                }
            </div>
            {/*<button onClick={showProfile}>Show Profile</button>*/}
            <button onClick={refresh}>Refresh</button>
        </>
    );

}