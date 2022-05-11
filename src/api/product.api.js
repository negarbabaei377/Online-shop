import http from "service/http.service";
import {PRODUCT} from "configs/endpoint.config"

export const productApi = async()=>{
    try {
        const response = await http.get(PRODUCT)
        return response
    }catch(error){
        return Promise.reject(error)
    }
}