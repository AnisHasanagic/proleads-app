import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class CompanyService {
    
    static toggle(assign: any): Promise<Response> {
        return apiCall(API_URI + "/assign", assign, "POST", true);
    };
    
}
