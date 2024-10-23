import useRefreshToken from "./useRefreshToken.ts";
import {axiosPrivate} from "../../../api/myAxios.ts";
import {useEffect} from "react";
import useAuth from "./useAuth.ts";

const useAxiosPrivate = () => {
    const {auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log("Request axiosPrivate");
                if (!config.headers['Authorization']) {
                    console.log("No Header");
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                console.log("Response axiosPrivate");
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log("New Access Token: " + newAccessToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;