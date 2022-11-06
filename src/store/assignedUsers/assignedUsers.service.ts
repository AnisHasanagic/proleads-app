import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class UsersAssignedService {
    static getAllAssigned(): Promise<Response> {
        return apiCall(API_URI + "/user/assigned", null, "GET", true);
    };


}