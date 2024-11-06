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
                        <p>{message}</p>
                    </div>
                }
                <div className="login-form">
                    <div className="header-box"></div>
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
                            <div className="error">
                                {errMap.get('email') !== undefined &&
                                    <p>{t(errMap.get('email') || '')}</p>}
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
                            <div className="error">
                                {errMap.get('password') !== undefined &&
                                    <p>{t(errMap.get('password') || '')}</p>}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="error">
                    {errMsg && <p>{t(errMsg)}</p>}
                </div>
                <button className="login-button" onClick={handleSubmit}>{t('logIn')}</button>
                <p className="change-action">
                    {t('notHaveAccountQuestion')} <br/> {t('signUp')} <Link to="/register">{t('hereLink')}</Link>.
                </p>
            </div>
        </>
    );
}

export default LoginPage;