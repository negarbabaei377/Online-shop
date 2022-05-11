import http from "service/http.service";
import {LOGIN} from "configs/endpoint.config";

export const loginApi = async(data) =>{
    try {
        const response = await http.post(LOGIN , data)
        return response;
    }catch (error){
        return Promise.reject(error)
    }
}