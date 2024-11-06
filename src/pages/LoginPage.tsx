import {FormEvent, useEffect, useRef, useState} from "react";
import {useApiAuth} from "../api/useApiAuth.ts";
import {LoginForm} from "../models/authModels.ts";
import "../assets/css/AuthForm.css"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {t} from "i18next";
import {Link, useLocation} from "react-router-dom";

const LoginPage = () => {
    const {login, errMsg, errMap} = useApiAuth();
    const location = useLocation();
    const message = location.state?.message;
    const userRef = useRef<HTMLInputElement>(null);
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        pwd: '',
    });

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoginForm({email: loginForm.email, pwd: ''});
        await login({loginForm})
    }

    return (
        <>
            <div className="form-box">
                <h2>{t('logIn')}</h2>
                {message &&
                    <div className="info">
                        <InfoOutlinedIcon/>
                        <span>{message}</span>
                    </div>
                }
                <div className="login-form">
                    <h1></h1>
                    <form onSubmit={handleSubmit}>
                        <div>
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
                            {errMap.get('email') !== undefined &&
                                <span className="error">{t(errMap.get('email') || '')}</span>}
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
                            {errMap.get('password') !== undefined &&
                                <span className="error">{t(errMap.get('password') || '')}</span>}
                        </div>
                    </form>
                </div>
                {errMsg && <span className="error">{t(errMsg)}</span>}
                <button className="login-button" onClick={handleSubmit}>{t('logIn')}</button>
                <p className="change-action">
                    {t('notHaveAccountQuestion')} <br/> {t('signUp')} <Link to="/register">{t('hereLink')}</Link>.
                </p>
            </div>
        </>
    );
}

export default LoginPage;