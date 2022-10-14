import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class CompanyService {
    
    static add(assign: any): Promise<Response> {
        console.log(assign)
        return apiCall(API_URI + "/assign", assign, "POST", true);
    };
    
}