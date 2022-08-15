import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001';

export default class AuthService {
    static login(user: any): Promise<Response> {
        return apiCall(API_URI + "/auth/signin", user, "POST");
    };

    static register(user: any): Promise<Response> {
        return apiCall(API_URI + "/auth/signup", user, "POST");
    };

    static updateUserData(user: any): Promise<Response> {
        return apiCall(API_URI + "/auth/updateUserData", user, "PUT", true)
    }

    static updatePassword(user: any): Promise<Response> {
        return apiCall(API_URI + "/auth/updatePassword", user, "PUT", true)
    }

    static checkAuthenticated(): Promise<Response> {
        return apiCall(API_URI + "/auth/verify", null, "GET", true);
    };
}
