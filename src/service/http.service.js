import axios from "axios";
import {toast} from 'react-toastify';
import {IS_LOGIN, TOKEN} from "configs/variables.config";
import {LOGIN, WHOAMI} from "configs/endpoint.config";
import {PATH} from 'configs/path.config'

class Http {
    constructor() {
        axios.defaults.baseURL = "http://localhost:3002"
        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem(TOKEN)
            if (token !== undefined && token !== "" && config.url !== LOGIN && config.url !== WHOAMI) {
                config.headers['token'] = `${token}`
            }
            return config
        }, (error) => {
            return Promise.reject(error.response.data)
        })
        axios.interceptors.response.use((response) => {
            return response
        }, (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem(TOKEN)
                localStorage.setItem(IS_LOGIN, "false")
                window.location.href = PATH.LOGIN
            } else {
                toast.error(error.response.data)
            }
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

    delete(url, config) {
        return axios.delete(url, config)
    }
}

export default new Http;
