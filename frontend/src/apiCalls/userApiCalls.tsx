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
        console.log(res);
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

export { userLoginAPI, userTokenAuthentication }