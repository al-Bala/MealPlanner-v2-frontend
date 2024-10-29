import React, {useState} from "react";
import {useApiAuth} from "../api/useApiAuth.ts";
import {RegisterForm} from "../models/authModels.ts";
import {t} from "i18next";

export const RegisterPage = () => {
    const { register, errMsg, errMap } = useApiAuth();
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <div>
            <h2>{t('signUp')}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {t('username')}:
                    <input
                        type="text"
                        name="username"
                        placeholder={t('username')}
                        value={registerForm.username}
                        onChange={(e) => handleChange(e)}
                        // required
                    />
                    <div>
                        {errMap.get('username') !== undefined && <span>{t(errMap.get('username') || '')}</span>}
                    </div>
                </div>
                <div>
                    {t('email')}:
                    <input
                        type="text"
                        name="email"
                        placeholder={t('email')}
                        value={registerForm.email}
                        onChange={handleChange}
                        // required
                    />
                    <div>
                        {errMap.get('email') !== undefined && <span>{t(errMap.get('email') || '')}</span>}
                    </div>
                </div>
                <div>
                    {t('password')}:
                    <input
                        type="password"
                        name="password"
                        placeholder={t('password')}
                        value={registerForm.password}
                        onChange={handleChange}
                        // required
                    />
                    <div>
                        {errMap.get('password') !== undefined && <span>{t(errMap.get('password') || '')}</span>}
                    </div>
                </div>
                <button type="submit">{t('signUp')}</button>

            </form>
            <p aria-live="assertive">{errMsg}</p>
        </div>
    );
};
