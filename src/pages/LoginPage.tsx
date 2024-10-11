import {FormEvent, useEffect, useRef, useState} from "react";
import {useApiAuth} from "../api/apiAuth.ts";
import {LoginForm} from "../models/authModels.ts";

const LoginPage = () => {
    const {login, errMsg, setErrMsg} = useApiAuth();
    const userRef = useRef<HTMLInputElement>(null);
    const [loginForm, setLoginForm] = useState<LoginForm>({
        user: '',
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
        setLoginForm({user: loginForm.user, pwd: ''});
        await login({loginForm})
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    value={loginForm.user}
                    onChange={(e) => setLoginForm(prevState => (
                        {...prevState, user: e.target.value}
                    ))}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={loginForm.pwd}
                    onChange={(e) => setLoginForm(prevState => (
                        {...prevState, pwd: e.target.value}
                    ))}
                    required
                />
                <button>Sign In</button>
            </form>
            <p aria-live="assertive">{errMsg}</p>
        </div>
    );
}

export default LoginPage;