import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class UsersService {
    static getAll(): Promise<Response> {
        return apiCall(API_URI + "/user", null, "GET", true);
    };

    static createUser(user: any): Promise<Response> {
        return apiCall(API_URI + "/user/createUser", user, "POST",true);
    };

    static update(user: any, user_id: string): Promise<Response> {
        return apiCall(API_URI + "/user/" + user_id, user, "PUT", true, true);
    };

    static updatePassword(user:any, user_id:string) : Promise<Response> {
        return apiCall(API_URI + "/user/updatePassword/"+ user_id,user,"PUT",true,true)
    }

}