import http from "service/http.service"
import {UPLOAD} from 'configs/endpoint.config'

export const UploadApi =async(data)=>{
    try{
        const response = await http.post(UPLOAD , data)
        return response
    }catch(error){
        return Promise.reject(error)
    }
}