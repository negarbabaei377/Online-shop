import axios from "axios";
import {toast} from 'react-toastify';

class Http {
    constructor() {
        axios.defaults.baseURL = "http://localhost:3002"
        axios.interceptors.request.use((config) => {
            return config
        }, (error) => {
            toast.error(error.response.data)
        })
        axios.interceptors.response.use((response) => {
            return response

        }, (error) => {
            toast.error(error.response.data)

        })
    }

    get(url, config) {
        return axios.get(url, config)
    }

    post(url, data, config) {
        return axios.post(url, data, config)
    }

    put(url, data, config) {
        return axios.put(url, data, config)
    }
}

export default new Http;
