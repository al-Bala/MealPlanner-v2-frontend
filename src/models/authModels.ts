export interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

export interface LoginForm {
    email: string;
    pwd: string;
}

export interface AuthResponse {
    username: string;
    accessToken: string;
}