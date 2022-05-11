import http from "service/http.service";
import {CATEGORY} from "configs/endpoint.config";

export const categoryApi = async() =>{
    try {
        const response = await http.get(CATEGORY)
        return response;
    }catch (error){
        return Promise.reject(error)
    }
}