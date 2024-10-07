import useAuth from "../features/authentication/hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {Profile} from "../models/userModels.ts";
import {apiUser} from "../api/apiUser.ts";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

export const ProfilePage = () => {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile>({
        username: '',
        plans: []
    });

    useEffect(() => {
        apiUser().showProfile({userId: auth.userId, setProfile: setProfile});
    }, [auth.userId]);

    return (
        <>
            <div>User id: {auth.userId}</div>
            <div>
                <h2>Plan History:</h2>
                {profile.plans.length !== 0 ? (
                    profile.plans.map((plan, planIndex) => (
                        <div key={planIndex}>
                            <p>Plan: {planIndex + 1}</p>
                            {plan.plannedDays.map((day, dayIndex) => (
                                <div key={dayIndex}>
                                    <p>{dayjs(day.date).format("DD.MM.YYYY")}</p>
                                    {day.plannedRecipes.map((recipe, recIndex) => (
                                        <div key={recIndex}>
                                            <p>{recipe.typeOfMeal}</p>
                                            <p>{recipe.recipeName}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button onClick={() => navigate('/grocery-list')}>Grocery list</button>
                        </div>
                    ))
                ) : (
                    <p>Brak przepisów w historii</p>
                )}
            </div>
        </>
    );

}