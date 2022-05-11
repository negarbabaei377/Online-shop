import {PRODUCT_GET_PRODUCT} from "configs/variables.config";
import {productApi} from "api/product.api"

const productAction =(data)=>({type : PRODUCT_GET_PRODUCT, payload :data})

export const getProduct =()=>{
    return(dispatch , getState)=>{
        return productApi().then(res=>{
            const {data} = res
            dispatch(productAction(data))
        }).catch(error=>{
            return Promise.reject(error)
        })
    }
}

