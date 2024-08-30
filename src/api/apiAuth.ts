import {useLocation, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import myAxios from "./myAxios.ts";
import {useState} from "react";
import {LoginForm, RegisterServerErrors, RegisterUser} from "../models/authModels.ts";
import Cookies from "js-cookie";
import useAuth from "../features/authentication/hooks/useAuth.ts";

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
    const [serverRegisterErrors, setServerRegisterErrors] = useState<RegisterServerErrors>({
        isUsernameValid: true,
        isEmailValid: true
    });

    const register = async ({formState: registerUser}: RegisterProps) => {
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
            navigate('/login', { state: {message: 'Registration successful. You may login now.' } })
        } catch (err) {
            if(err instanceof AxiosError) {
                if(!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    console.log('Unsuccessful register: ', err.response.data);
                    setServerRegisterErrors({
                        isUsernameValid: err.response.data.isUsernameValid,
                        isEmailValid: err.response.data.isEmailValid
                    })
                    navigate('/register');
                } else {
                    setErrMsg('RegisterPage Failed')
                }
            }
        }
    };

    const login = async ({loginForm}: LoginProps) => {
        try {
            const response = await myAxios.post(LOGIN_URL,
                JSON.stringify({username: loginForm.user, password: loginForm.pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response?.data);
            Cookies.set('username', response?.data, {
                path: '/',
                sameSite: 'Strict',
                expires: 7,
            });
            const username = Cookies.get('username');
            // // const roles = response?.data?.roles;
            setAuth({username: username})
            navigate(from, { replace: true });
        } catch (err) {
            if(err instanceof AxiosError) {
                if(!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 401) {
                    console.log("401")
                    setErrMsg('Unauthorized')
                } else {
                    setErrMsg('Login Failed')
                }
            }
        }
    };

    const logout = async (path: string) => {
        await myAxios.get(LOGOUT_URL, {
            withCredentials: true   // allow sent cookies with request
        });
        Cookies.remove('username', { path: '/' });
        setAuth(prev => {
            console.log("Logout: ", JSON.stringify(prev));
            return {...prev, username: ''}
        });
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
        serverRegisterErrors
    };
};