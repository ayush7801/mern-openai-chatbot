import { createContext, useContext, useEffect, useState } from "react";
import { userLoginAPI, userTokenAuthentication } from "../apiCalls/userApiCalls";
import toast from "react-hot-toast";

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

    useEffect(() => {
        // make a request to the server to check if the user is logged in
        // if the user is logged in, set the user and isLoggedIn to true
        // else set the user and isLoggedIn to false
        async function checkUserAuthStatus() {
            toast.loading('Authenticating User...', {id: 'login'});

            return new Promise<void>( async (resolve, reject) => {
                // make a request to the server to login
                const res: any = await userTokenAuthentication();
                if (res instanceof Error) {
                    console.log("Some error occurred while Authenticating user: ", res);
                    toast.error('Authentication failed, log in again...', {id: 'login'});
                    return reject();
                }
                // if successful, set the user and isLoggedIn to true
                setUser({name: res.name, email: res.email});
                setIsLoggedIn(true);
                toast.success('Successfully Authenticated...', {id: 'login'});
                return resolve();
            });
        }
        checkUserAuthStatus();
    }, []);

    const login = async (email: string, password: string) => {
        toast.loading('Logging in...', {id: 'login'});

        return new Promise<void>( async (resolve, reject) => {
            // make a request to the server to login
            const res: any = await userLoginAPI(email, password);
            if (res instanceof Error) {
                console.log("Some error occurred while logging in user: ", res);
                toast.error('Logging in failed...', {id: 'login'});
                return reject();
            }
            // if successful, set the user and isLoggedIn to true
            setUser({name: res.name, email: res.email});
            setIsLoggedIn(true);
            toast.success('Successfully logged in...', {id: 'login'});
            return resolve();
        });
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