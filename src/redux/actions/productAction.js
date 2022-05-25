import {PRODUCT_GET_PRODUCT, PRODUCT_GET_SINGLE_CATEGORY, PRODUCT_GET_SINGLE_PRODUCT} from "configs/variables.config";
import {getProductCategory, getSingleProduct, productApi} from "api/product.api"

const productAction =(data)=>({type : PRODUCT_GET_PRODUCT, payload :data})
const productActionId =(data)=>({type : PRODUCT_GET_SINGLE_PRODUCT, payload :data})
const productActionCategory =(data)=>({type : PRODUCT_GET_SINGLE_CATEGORY, payload :data})

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

export const getSingleProductId =(id)=>{
    return(dispatch , getState)=>{
        return getSingleProduct(id).then(res=>{
            const {data} = res
            dispatch(productActionId(data))
        }).catch(error=>{
            return Promise.reject(error)
        })
    }
}

export const getSingleCategory =(id , page)=>{
    return(dispatch , getState)=>{
        return getProductCategory(id , page).then(res=>{
            const {data , headers} = res
            dispatch(productActionCategory(data))
            return headers
        }).catch(error=>{
            return Promise.reject(error)
        })
    }
}


