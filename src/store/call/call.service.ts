import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class CallService {
    static add(call: any): Promise<Response> {
        return apiCall(API_URI + "/call", call, "POST", true);
    };

    static getAll(data:any) : Promise<Response> {
        return apiCall(API_URI + `/call/list/${data.company_id}?startDate=${data.startDate}&endDate=${data.endDate}`, null ,"GET",true,true)
    };

    static sendMail(data:any) : Promise<Response>{
        console.log(data)
        return apiCall(API_URI + "/mail",data,"POST",true)
    }
 }