import React, {useState} from "react";
import {useApiAuth} from "../api/useApiAuth.ts";
import {RegisterForm} from "../models/authModels.ts";
import {t} from "i18next";

interface RegisterValidErrors {
    username?: string;
    email?: string;
    password?: string;
}

export const RegisterPage = () => {
    const { register, serverRegisterErrors, errMsg } = useApiAuth();
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        username: '',
        email: '',
        password: '',
    });
    const [validErrors, setValidErrors] = useState<RegisterValidErrors>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validate()){
            await register({formState: registerForm});
            setRegisterForm({username: registerForm.username, email: registerForm.email, password: ''})
        }
    };

    const validate = () => {
        const newErrors: RegisterValidErrors = {};
        if (!registerForm.username) newErrors.username = 'Username is required';
        if (!registerForm.email) newErrors.email = 'Email is required';
        if (!registerForm.password) newErrors.password = 'Password is required';
        setValidErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
                        {validErrors.username && <span>{validErrors.username}</span>}
                        {!serverRegisterErrors.isUsernameValid && <span>This username is taken.</span>}
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
                        {validErrors.email && <span>{validErrors.email}</span>}
                        {!serverRegisterErrors.isEmailValid && <span>This email is already in use. Try to login.</span>}
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
                        {validErrors.password && <span>{validErrors.password}</span>}
                    </div>
                </div>
                <button type="submit">{t('signUp')}</button>

            </form>
            <p aria-live="assertive">{errMsg}</p>
        </div>
    );
};
