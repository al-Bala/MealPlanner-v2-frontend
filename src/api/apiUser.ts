import {AxiosError} from 'axios';
import myAxios from "./myAxios.ts";
import {Profile} from "../models/userModels.ts";
import {Dispatch, SetStateAction} from "react";
import {PlanToSave, SavedPrefers} from "../models/generatorModels.ts";

interface ShowProfileProps {
    userId: string | undefined;
    setProfile: Dispatch<SetStateAction<Profile>>;
}

interface UpdatePrefersProps {
    userId: string | undefined;
    savedPrefers: SavedPrefers;
}

interface SavePlanProps {
    userId: string | undefined;
    tempPlan: PlanToSave;
}

export const apiUser = () => {
    const getPrefers = async ({userId}: { userId: string | undefined }): Promise<SavedPrefers | undefined> => {
        try {
            const response = await myAxios.get(`/users/${userId}/prefs`,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log('Success GET prefers ', response?.data);
            return response?.data;
        } catch (err) {
            console.log("Api error!")
        }
    };

    const updatePrefers = async ({userId, savedPrefers}: UpdatePrefersProps): Promise<SavedPrefers | undefined> => {
        try {
            const response = await myAxios.put(`/users/${userId}/prefs`, savedPrefers,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log('Success prefers update', response.data);
            return response?.data;
        } catch (err) {
            console.log("Api error!")
        }
    };

    const showProfile = async ({userId, setProfile}: ShowProfileProps) => {
        try {
            const response = await myAxios.get(`/users/${userId}/profile`,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response?.data);
            setProfile(response?.data);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else if (err.response?.status === 401) {
                    console.log("Unauthorized 401")
                } else {
                    console.log("Login Failed")
                }
            }
        }
    };

    const savePlan = async ({userId, tempPlan}: SavePlanProps): Promise<string | undefined> => {
        try {
            const response = await myAxios.post(`/users/${userId}/plans`, tempPlan, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log('Success (plan saved):', response.data);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 400) {
                    console.log("400: " + err.response?.data)
                    alert('Taki plan już istnieje!')
                } else {
                    console.log("Api error!")
                }
            }
        }
    };

    return {
        getPrefers,
        updatePrefers,
        showProfile,
        savePlan
    };
};
