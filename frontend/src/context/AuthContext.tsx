import { createContext, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
} 
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {}, []);

    const login = async (email: string, password: string) => {
        // make a request to the server to login
        // if successful, set the user and isLoggedIn to true
        setUser({name: 'John Doe', email});
        setIsLoggedIn(true);
    }

    const signup = async (name: string, email: string, password: string) => {
        // make a request to the server to signup
        // if successful, set the user and isLoggedIn to true
        setUser({name, email});
        setIsLoggedIn(true);
    }

    const logout = async () => {
        // make a request to the server to logout
        // if successful, set the user and isLoggedIn to false
        setUser(null);
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);