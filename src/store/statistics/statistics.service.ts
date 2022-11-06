import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class StatisticService {
    static getAll(data:any) : Promise<Response> {
        return apiCall(API_URI + `/call/${data.company_id}?startDate=${data.startDate}&endDate=${data.endDate}`, null ,"GET",true,true)
    };
 }