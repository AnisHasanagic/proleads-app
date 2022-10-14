import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class DetailService {
    
    
    static getOne(company_id:string): Promise<Response> {
        return apiCall(API_URI+"/company/"+ company_id, null,"GET",true)
    }

}