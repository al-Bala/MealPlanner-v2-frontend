import myAxios from "../../../api/myAxios.ts";
import {AxiosError} from "axios";
import {useApiAuth} from "../../../api/apiAuth.ts";

const useRefreshToken = () => {
    const {logout} = useApiAuth();

    return async () => {
        try {
            await myAxios.get('/auth/refresh-token', {
                withCredentials: true   // allow sent cookies with request
            });
            console.log("New access token")
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