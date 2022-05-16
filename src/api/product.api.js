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


export const postProduct = async (data)=>{
    try{
        const response = await http.post(PRODUCT , data)
        return response
    }catch(error){
        return Promise.reject(error)
    }
}

export const putProduct = async(id , data)=>{
    try{
        const response = await http.put(`${PRODUCT}/${id}` , data)
        return response
    }catch(error){
        return Promise.reject(error)
    }
}