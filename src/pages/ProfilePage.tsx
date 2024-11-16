import useAuth from "../features/authentication/hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {Profile} from "../models/userModels.ts";
import {useApiUser} from "../api/useApiUser.ts";
import "../assets/css/profile/ProfileUserData.css"
import "../assets/css/profile/ProfileHistory.css"
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
        let isMounted = true;
        const controller = new AbortController();

        apiUser.showProfile({controller})
            .then(response => {
                if(response){
                    isMounted && setProfile(response)
                }
            });

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <>
            <div className="user-data-section">
                <div className="data-box">
                    <div className="data-inner-box">
                        <p className="label">Username:</p>
                        <p>{auth.username}</p>
                    </div>
                    <div className="data-inner-box">
                        <p className="label">Email:</p>
                        <p>email@e.pl</p>
                    </div>
                </div>
            </div>
            <div className="plans-his-section">
                <h2>{t('plansHistory')}</h2>
                <div className="plans-his-container">
                    {profile.plans.length !== 0 ? (
                        <PlanHistory profile={profile}/>
                    ) : (
                        <div className="empty-plans-his">
                            <p>{t('emptyHistoryMsg')}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

}