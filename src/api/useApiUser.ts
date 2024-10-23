import {AxiosError} from 'axios';
import {PlanToSave, SavedPrefers} from "../models/generatorModels.ts";
import useAxiosPrivate from "../features/authentication/hooks/useAxiosPrivate.ts";
import {useNavigate} from "react-router-dom";
import useAuth from "../features/authentication/hooks/useAuth.ts";

interface UpdatePrefersProps {
    username: string | undefined;
    savedPrefers: SavedPrefers;
}

interface SavePlanProps {
    username: string | undefined;
    tempPlan: PlanToSave;
}

export const useApiUser = () => {
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const getPrefers = async ({controller}: {controller: AbortController}): Promise<SavedPrefers | undefined> => {
        try {
            console.log("Prefers axios")
            const response = await axiosPrivate.get(`/users/${auth.username}/prefs`, {
                signal: controller.signal
            });
            console.log('Success GET prefers ', response?.data);
            return response?.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else if (err.response?.status === 401) {
                    console.log("Get Prefers 401")
                } else {
                    console.log("Get Prefers Failed")
                }
            }
        }
    };

    const updatePrefers = async ({username, savedPrefers}: UpdatePrefersProps): Promise<SavedPrefers | undefined> => {
        try {
            const response = await axiosPrivate.put(`/users/${username}/prefs`, savedPrefers);
            console.log('Success prefers update', response.data);
            return response?.data;
        } catch (err) {
            console.log("Api error!")
        }
    };

    const showProfile = async ({controller}: {controller: AbortController}) => {
        try {
            console.log("Profile axios")
            const response = await axiosPrivate.get(`/users/${auth.username}/profile`, {
                signal: controller.signal
            });
            console.log(response?.data);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else if (err.response?.status === 401) {
                    console.log("Show Profile 401")
                } else {
                    console.log("Show Profile Failed")
                }
            }
        }
    }

    const savePlan = async ({username, tempPlan}: SavePlanProps) => {
        try {
            const response = await axiosPrivate.post(`/users/${username}/plans`, tempPlan, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log('Success (plan saved):', response.data);
            await response.data;
            navigate('/profile')
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
