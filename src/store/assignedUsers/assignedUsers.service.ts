import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class UsersAssignedService {
    static getAllAssigned(data:any): Promise<Response> {
        console.log(data)
        return apiCall(API_URI + "/user/assigned/"+data, null, "GET", true);
    };


}