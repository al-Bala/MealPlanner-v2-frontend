import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

interface Auth {
    username: string | undefined,
    accessToken: string | undefined,
}

export interface AuthContextProps {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>
}

const initialAuthContext: AuthContextProps = {
    auth: {username: '', accessToken: ''},
    setAuth: () => {}
};

interface Props {
    children: ReactNode
}

const AuthContext = createContext<AuthContextProps>(initialAuthContext);

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<Auth>({username: '', accessToken: ''});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;