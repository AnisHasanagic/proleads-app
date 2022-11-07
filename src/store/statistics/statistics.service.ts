import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class StatisticService {
    static getAll() : Promise<Response> {
        return apiCall(API_URI + `/call/stat`, null ,"GET",true,true)
    };
 }