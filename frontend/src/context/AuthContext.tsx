import { createContext, useContext, useEffect, useState } from "react";
import { logOut, userLoginAPI, userTokenAuthentication, usersignupAPI } from "../apiCalls/userApiCalls";
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
        toast.loading('Signing up...', {id: 'signup'});

        return new Promise<void>( async (resolve, reject) => {
            // make a request to the server to login
            const res: any = await usersignupAPI(name, email, password);
            if (res instanceof Error) {
                console.log("Some error occurred while Signing up user: ", res);
                toast.error('Signing up failed...', {id: 'signup'});
                return reject();
            }
            // if successful, set the user and isLoggedIn to true
            setUser({name: res.name, email: res.email});
            setIsLoggedIn(true);
            toast.success('Successfully signed up...', {id: 'signup'});
            return resolve();
        });
    }

    const logout = async () => {
        toast.loading('Logging out...', {id: 'logout'});
        console.log("Logging out user...");
        try{
        // make a request to the server to logout
        const res = await logOut();
        if (res instanceof Error) {
            toast.error('Logging out failed...', {id: 'logout'});
            return;
        }
        // if successful, set the user and isLoggedIn to false
        setUser(null);
        setIsLoggedIn(false);
        toast.success('Successfully logged out...', {id: 'logout'});
        } catch(err){
            console.error("Some error occurred while logging out user: ", err);
            toast.error('Logging out failed...', {id: 'logout'});
        }
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);