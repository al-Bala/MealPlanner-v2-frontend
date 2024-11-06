import React, {useState} from "react";
import {useApiAuth} from "../api/useApiAuth.ts";
import {RegisterForm} from "../models/authModels.ts";
import "../assets/css/AuthForm.css"
import {t} from "i18next";
import {Link} from "react-router-dom";

export const RegisterPage = () => {
    const { register, errMsg, errMap } = useApiAuth();
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({formState: registerForm});
        setRegisterForm({username: registerForm.username, email: registerForm.email, password: ''})
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm({
            ...registerForm,
            [name]: value,
        });
    };

    return (
        <div className="form-box">
            <h2>{t('signUp')}</h2>
            <div className="login-form">
                <div className="header-box"></div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">{t('username')}:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder={t('username')}
                            value={registerForm.username}
                            onChange={(e) => handleChange(e)}
                            // required
                        />
                        <div className="error">
                            {errMap.get('username') !== undefined &&
                                <p>{t(errMap.get('username') || '')}</p>}
                        </div>
                        <label htmlFor="email">{t('email')}:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder={t('email')}
                            value={registerForm.email}
                            onChange={handleChange}
                            // required
                        />
                        <div className="error">
                            {errMap.get('email') !== undefined &&
                                <p>{t(errMap.get('email') || '')}</p>}
                        </div>
                        <label htmlFor="password">{t('password')}:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder={t('password')}
                            value={registerForm.password}
                            onChange={handleChange}
                            // required
                        />
                        <div className="error">
                            {errMap.get('password') !== undefined &&
                                <p>{t(errMap.get('password') || '')}</p>}
                        </div>
                    </div>
                </form>
            </div>
            {errMsg && <span className="error">{t(errMsg)}</span>}
            <button className="login-button" onClick={handleSubmit}>{t('signUp')}</button>
            <p className="change-action">
                {t('alreadyHaveAccountQuestion')} <br/> {t('logIn')} <Link to="/login">{t('hereLink')}</Link>.
            </p>
        </div>
    );
};
