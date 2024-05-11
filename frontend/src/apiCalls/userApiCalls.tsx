import axios from "axios";

const userLoginAPI = async (email: string, password: string) => {
    try {
        const user_req_body = {
            email: email,
            password: password
        }
        const res = await axios.post(`/users/login`, user_req_body);
        if (res.status === 200) {
            console.log("User logged in successfully");
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
            console.log("User authenticated successfully");
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
            console.log("Chat request sent successfully");
            return await res.data;
        }
        throw new Error(res.data.message);
    }catch(err){
        console.error(`Some error occurred while sending chat request with status code ${(err as any)?.response?.status}: and message: ${(err as any)?.response?.data?.message as string}`);
        return err;
    }
}

export { userLoginAPI, userTokenAuthentication, sendChatRequest }