import useAuth from "./useAuth.ts";
import myAxios from "../../../api/myAxios.ts";
import {AxiosError, AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

interface AuthResponse {
    username: string;
    accessToken: string;
}

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    return async () => {
        try {
            const response: AxiosResponse<AuthResponse> = await myAxios.get('/auth/refresh-token', {
                withCredentials: true   // allow sent cookies with request
            });

            setAuth(prev => {
                console.log("RefreshToken: " + JSON.stringify(prev));
                return {...prev, accessToken: response.data.accessToken};
            });
            return response.data.accessToken;
        } catch (error) {
            if(error instanceof AxiosError && error.response) {
                console.log('RefreshToken error');
                if(error.response.status === 401){
                    console.log('RefreshToken expired');
                    navigate('/login');
                }
            } else {
                console.log("Request error")
            }
            // if (axios.isAxiosError(error)) {
            //     const axiosError = error as AxiosError;
            //
            //     // Check if the error is a 401 Unauthorized
            //     if (axiosError.response && axiosError.response.status === 401) {
            //         console.error('Unauthorized! Redirecting to login or handling the situation.');
            //         // Here you can handle the 401 error, like redirecting to a login page
            //         // For example: window.location.href = '/login';
            //         // Or clearing the authentication state
            //     } else {
            //         console.error('An error occurred while refreshing the token:', error.message);
            //     }
            // } else {
            //     console.error('An unexpected error occurred:', error);
            // }
            //
            // // Optionally, rethrow the error if you want the caller to handle it
            // throw error;
        }
        // const response: AxiosResponse<AuthResponse> = await myAxios.get('/auth/refresh-token', {
        //     withCredentials: true   // allow sent cookies with request
        // });
        // setAuth(prev => {
        //     console.log("RefreshToken: " + JSON.stringify(prev));
        //     // console.log(response.data.accessToken);
        //     return {...prev, accessToken: response.data.accessToken}
        // });
        // return response.data.accessToken;
    };
};

export default useRefreshToken;