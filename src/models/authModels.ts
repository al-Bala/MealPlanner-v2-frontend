export interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

export interface RegisterServerErrors {
    isUsernameValid: boolean;
    isEmailValid: boolean;
}

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

export interface LoginForm {
    user: string;
    pwd: string;
}