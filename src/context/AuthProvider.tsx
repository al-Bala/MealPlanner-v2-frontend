import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

interface Auth {
    username: string,
    password: string,
    accessToken: string
}

export interface AuthContextProps {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
    // inactiveTime: number
}

const initialAuthContext: AuthContextProps = {
    auth: {username: '', password: '', accessToken: ''},
    setAuth: () => {},
    // inactiveTime: 0
};

interface Props {
    children: ReactNode
}

const AuthContext = createContext<AuthContextProps>(initialAuthContext);

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<Auth>({username: '', password: '', accessToken: ''});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;