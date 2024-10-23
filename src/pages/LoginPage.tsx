import {FormEvent, useEffect, useRef, useState} from "react";
import {useApiAuth} from "../api/useApiAuth.ts";
import {LoginForm} from "../models/authModels.ts";
import {t} from "i18next";

const LoginPage = () => {
    const {login, errMsg, setErrMsg} = useApiAuth();
    const userRef = useRef<HTMLInputElement>(null);
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        pwd: '',
    });

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [loginForm, setErrMsg])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginForm({email: loginForm.email, pwd: ''});
        await login({loginForm})
    }

    return (
        <div>
            <h2>{t('logIn')}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">{t('email')}:</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prevState => (
                        {...prevState, email: e.target.value}
                    ))}
                    required
                />
                <label htmlFor="password">{t('password')}:</label>
                <input
                    type="password"
                    id="password"
                    value={loginForm.pwd}
                    onChange={(e) => setLoginForm(prevState => (
                        {...prevState, pwd: e.target.value}
                    ))}
                    required
                />
                <button>{t('logIn')}</button>
            </form>
            <p aria-live="assertive">{errMsg}</p>
        </div>
    );
}

export default LoginPage;