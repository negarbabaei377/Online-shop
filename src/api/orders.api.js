import {ORDERS} from "configs/endpoint.config";
import http from 'service/http.service'

export const OrdersApi = async ()=>{
    try{
        const response = await http.get(ORDERS)
        return response
    }catch(error){
        return Promise.reject(error)
    }
}

export const putOrder = async (id , data)=>{
    try{
        const response = await http.put(`${ORDERS}/${id}` ,  data)
        return response
    }catch(error){
        return Promise.reject(error)
    }

}

export const postOrder = async (data)=>{
    try{
        const response = await http.post(ORDERS , data)
        return response
    }catch(error){
        return Promise.reject(error)
    }
}
