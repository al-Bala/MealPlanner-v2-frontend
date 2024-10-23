import myAxios from "../../../api/myAxios.ts";
import {AxiosError} from "axios";
import {useApiAuth} from "../../../api/useApiAuth.ts";
import useAuth from "./useAuth.ts";

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();
    const {logout} = useApiAuth();

    return async () => {
        try {
            const response = await myAxios.post('/auth/refresh-token', auth.username, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            setAuth({username: auth.username, accessToken: response.data.accessToken})
            console.log("New access token")
            return response.data.accessToken;
        } catch (error) {
            if(error instanceof AxiosError && error.response) {
                console.log('RefreshToken error');
                if(error.response.status === 401){
                    console.log('RefreshToken expired');
                    logout('/login');
                }
            } else {
                console.log("Request error")
            }
        }
    };
};

export default useRefreshToken;