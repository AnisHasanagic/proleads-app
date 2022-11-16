import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class UsersAssignedService {
    static getAllUnAssigned(data:any): Promise<Response> {
        return apiCall(API_URI + "/user/unassigned/"+data, null, "GET", true);
    };


}