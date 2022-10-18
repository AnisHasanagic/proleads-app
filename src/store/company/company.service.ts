import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class CompanyService {
    
    static getAll(user_id:string): Promise<Response> {
        return apiCall(API_URI + "/company/"+ user_id, null, "GET", true);
    };

    static update(company: any, company_id: string): Promise<Response> {
        return apiCall(API_URI + "/company/" + company_id, company, "PUT", true);
    };

    static add(company: any): Promise<Response> {
        return apiCall(API_URI + "/company", company, "POST", true);
    };
    
    static getOne(company_id:string): Promise<Response> {
        return apiCall(API_URI+"/company/"+ company_id, null,"GET",true)
    }

}