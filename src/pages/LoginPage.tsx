import {FormEvent, useEffect, useRef, useState} from "react";
import {useApiAuth} from "../api/useApiAuth.ts";
import {LoginForm} from "../models/authModels.ts";
import {t} from "i18next";

const LoginPage = () => {
    const {login, errMsg, errMap} = useApiAuth();
    const userRef = useRef<HTMLInputElement>(null);
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        pwd: '',
    });

    useEffect(() => {
        userRef.current?.focus();
    }, []);

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
                    placeholder={t('email')}
                    ref={userRef}
                    autoComplete="off"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prevState => (
                        {...prevState, email: e.target.value}
                    ))}
                    // required
                />
                <div>
                    {errMap.get('email') !== undefined && <span>{t(errMap.get('email') || '')}</span>}
                </div>
                <label htmlFor="password">{t('password')}:</label>
                <input
                    type="password"
                    id="password"
                    placeholder={t('password')}
                    value={loginForm.pwd}
                    onChange={(e) => setLoginForm(prevState => (
                        {...prevState, pwd: e.target.value}
                    ))}
                    // required
                />
                <div>
                    {errMap.get('password') !== undefined && <span>{t(errMap.get('password') || '')}</span>}
                </div>
                <button>{t('logIn')}</button>
            </form>
            <p aria-live="assertive">{t(errMsg)}</p>
        </div>
    );
}

export default LoginPage;