import useRefreshToken from "./useRefreshToken.ts";
import {axiosPrivate} from "../../../api/myAxios.ts";
import {useEffect} from "react";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        // console.log("Auth ", auth.accessToken)
        // const requestIntercept = axiosPrivate.interceptors.request.use(
        //     config => {
        //         if(!config.headers['Authorization']) {
        //             config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        //         }
        //         return config;
        //     }, (error) => Promise.reject(error)
        // );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    await refresh();
                    console.log('Refresh')
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;