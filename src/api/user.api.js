import {WHOAMI} from "configs/endpoint.config";
import http from 'service/http.service';

export const UserApi = async () => {
    try {
        const response = await http.get(WHOAMI)
        return response
    } catch (error) {
        return Promise.reject(error)

    }
}