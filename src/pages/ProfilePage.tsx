import useAuth from "../features/authentication/hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {Profile} from "../models/userModels.ts";
import {apiUser} from "../api/apiUser.ts";
import "../../src/assets/css/Profile.css"
import {PlanHistory} from "../features/profile/PlanHistory.tsx";

export const ProfilePage = () => {
    const {auth} = useAuth();
    const [profile, setProfile] = useState<Profile>({
        username: '',
        plans: []
    });

    useEffect(() => {
        apiUser().showProfile({userId: auth.userId, setProfile: setProfile});
    }, [auth.userId]);

    return (
        <>
            <div style={{margin: "20px 0 20px 0"}}>User ID: {auth.userId}</div>
            <div className="plan-history">
                <h2>Plan History:</h2>
                {profile.plans.length !== 0 ? (
                    <PlanHistory profile={profile}/>
                ) : (
                    <p className="empty-message">Brak przepisów w historii</p>
                )}
            </div>
        </>
    );

}