import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class AuthService {
    static login(user: any): Promise<Response> {
        return apiCall(API_URI + "/auth/signin", user, "POST");
    };

    static createUser(user: any): Promise<Response> {
        return apiCall(API_URI + "/user/createUser", user, "POST");
    };
      
    static getAll(): Promise<Response> {
        return apiCall(API_URI + "/user", null, "GET", true);
    };

    static updatePassword(user: any): Promise<Response> {
        return apiCall(API_URI + "/auth/updatePassword", user, "PUT", true)
    }

    static checkAuthenticated(): Promise<Response> {
        return apiCall(API_URI + "/auth/verify", null, "GET", true);
    };
}
