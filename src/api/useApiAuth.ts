import {useLocation, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import myAxios from "./myAxios.ts";
import {useState} from "react";
import {AuthResponse, LoginForm, RegisterUser} from "../models/authModels.ts";
import useAuth from "../features/authentication/hooks/useAuth.ts";
import {t} from "i18next";

const REGISTER_URL: string = '/auth/register';
const LOGIN_URL: string = '/auth/login';
const LOGOUT_URL: string = '/auth/logout';

interface LoginProps {
    loginForm: LoginForm;
}

interface RegisterProps {
    formState: RegisterUser;
}

export const useApiAuth = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";     // where user came from
    const [errMsg, setErrMsg] = useState('');
    const [errMap, setErrMap] = useState(new Map<string, string>());

    const register = async ({formState: registerUser}: RegisterProps) => {
        setErrMsg('')
        try {
            const response = await myAxios.post(REGISTER_URL,
                JSON.stringify({
                    username: registerUser.username,
                    email: registerUser.email,
                    password: registerUser.password
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                }
            );
            console.log(response?.data);
            navigate('/login', { state: {message: t('successfulRegister')}})
        } catch (err) {
            if(err instanceof AxiosError) {
                if(!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    console.log('Unsuccessful register: ', err.response.data);
                    const errorMap = new Map<string, string>(Object.entries(err.response.data));
                    setErrMap(errorMap);
                    navigate('/register');
                } else {
                    setErrMsg('RegisterPage Failed')
                }
            }
        }
    };

    const login = async ({loginForm}: LoginProps) => {
        setErrMsg('')
        try {
            const response = await myAxios.post(LOGIN_URL,
                JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.pwd
                }),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            console.log(response?.data);
            const authResponse: AuthResponse = response?.data;
            setAuth({username: authResponse.username, accessToken: authResponse.accessToken})
            navigate(from, { replace: true });
        } catch (err) {
            if(err instanceof AxiosError) {
                if(!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    const errorMap = new Map<string, string>(Object.entries(err.response.data));
                    setErrMap(errorMap);
                } else if (err.response?.status === 401) {
                    errMap.clear();
                    setErrMsg('unauthorizedLogInMsg')
                } else {
                    setErrMsg('Login Failed')
                }
            }
        }
    };

    const logout = async (path: string) => {
        await myAxios.get(LOGOUT_URL);
        setAuth(prev => {
            console.log("Logout: ", JSON.stringify(prev));
            return {...prev, username: '', accessToken: ''}
        });
        console.log("Logout");
        if(path){
            navigate(path);
        }
    }

    return {
        register,
        login,
        logout,
        errMsg,
        setErrMsg,
        errMap
    };
};