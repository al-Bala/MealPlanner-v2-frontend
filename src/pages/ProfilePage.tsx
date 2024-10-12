import useAuth from "../features/authentication/hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {Profile} from "../models/userModels.ts";
import {useApiUser} from "../api/useApiUser.ts";
import "../../src/assets/css/Profile.css"
import {PlanHistory} from "../features/profile/PlanHistory.tsx";
import {t} from "i18next";

export const ProfilePage = () => {
    const {auth} = useAuth();
    const apiUser = useApiUser();
    const [profile, setProfile] = useState<Profile>({
        username: '',
        plans: []
    });

    useEffect(() => {
        apiUser.showProfile({userId: auth.userId, setProfile: setProfile});
    }, [auth.userId]);

    return (
        <>
            <div style={{margin: "20px 0 20px 0"}}>{t('userId')}: {auth.userId}</div>
            <div className="plan-history">
                <h2>{t('planHistory')}:</h2>
                {profile.plans.length !== 0 ? (
                    <PlanHistory profile={profile}/>
                ) : (
                    <p className="empty-message">{t('emptyHistoryMsg')}</p>
                )}
            </div>
        </>
    );

}