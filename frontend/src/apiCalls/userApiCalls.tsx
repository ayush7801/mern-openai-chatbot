import axios from "axios";

const usersignupAPI = async (name: string, email: string, password: string) => {
    try {
        const user_req_body = {
            name: name,
            email: email,
            password: password
        }
        const res = await axios.post(`/users/signup`, user_req_body);
        if (res.status === 201) {
            return await res.data;
        }
    } catch (err) {
        console.error(`Some error occurred while signing up user with status code ${(err as any)?.response?.status}: and message: ${(err as any)?.response?.data?.message}`);
        console.error("Some error occurred while signing up user: ", err);
        return err;
    }
}

const userLoginAPI = async (email: string, password: string) => {
    try {
        const user_req_body = {
            email: email,
            password: password
        }
        const res = await axios.post(`/users/login`, user_req_body);
        if (res.status === 200) {
            return await res.data;
        }
    } catch (err) {
        console.error(`Some error occurred while logging in user with status code ${(err as any)?.response?.status}: and message: ${(err as any)?.response?.data?.message}`);
        console.error("Some error occurred while logging in user: ", err);
        return err;
    }
}

const userTokenAuthentication = async () => {
    try {
        const res = await axios.get(`/users/auth-status`);
        if (res.status === 200) {
            return await res.data;
        }
    } catch (err) {
        console.error(`Some error occurred while authenticating user with status code ${(err as any)?.response?.status}: and message: ${(err as any)?.response?.data?.message}`);
        console.error("Some error occurred while authenticating user: ", err);
        return err;
    }
}

const sendChatRequest = async (message: string) => {
    try{
        const res = await axios.post(`/chats/generateChatCompletion`, {message});
        if(res.status === 200){
            return await res.data;
        }
        throw new Error(res.data.message);
    }catch(err){
        console.error(`Some error occurred while sending chat request with status code ${(err as any)?.response?.status}: and message: ${(err as any)?.response?.data?.message as string}`);
        return err;
    }
}

const getChatHistory = async () => {
    try{
        const res = await axios.post(`/chats/getChatHistory`);
        if(res.status === 200){
            return await res.data;
        }
        throw new Error(res.data.message);
    }catch(err){
        console.error(`Some error occurred while sending chat request with status code ${(err as any)?.response?.status}: and message: ${(err as any)?.response?.data?.message as string}`);
        return err;
    }
}

const clearChat = async () => {
    try{
        const res = await axios.post(`/chats/clearChat`);
        if(res.status === 200){
            return await res.data;
        }
        throw new Error(res.data.message);
    }catch(err){
        console.error(`Some error occurred while sending chat request with status code ${(err as any)?.response?.status}and message: ${(err as any)?.response?.data?.message as string}`);
        return err;
    }
}

const logOut = async () => {
    try {
        const res = await axios.post(`/users/logout`);
        if (res.status === 200) {
            console.log("User logged out successfully");
            return await res.data;
        }
    } catch (err) {
        console.error(`Some error occurred while logging out user with status code ${(err as any)?.response?.status}: and message: ${(err as any)?.response?.data?.message}`);
        console.error("Some error occurred while logging out user: ", err);
        return err;
    }
}

const getDummyResponse = async (message : string) => {
    try {
        const response = await axios.post('/chats/getSingleResponse', {message});
        if(response.status === 200){
            return await response.data;
        }
        throw new Error("response status is not 200");
    } catch (error) {
        console.error(`Some error occurred while getting first response user with status code ${(error as any)?.response?.status}: and message: ${(error as any)?.response?.data?.message}`);
        return error;
    }
}

export { userLoginAPI, userTokenAuthentication, sendChatRequest, getChatHistory, clearChat, logOut, usersignupAPI, getDummyResponse }