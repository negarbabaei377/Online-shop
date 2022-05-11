import {CATEGORY_GET_CATEGORY} from "configs/variables.config";
import {categoryApi} from "api/category.api"

const categoryAction =(data)=>({type : CATEGORY_GET_CATEGORY, payload :data})

export const getCategory =()=>{
    return(dispatch , getState)=>{
        return categoryApi().then(res=>{
            const {data} = res
            dispatch(categoryAction(data))
        }).catch(error=>{
            return Promise.reject(error)
        })
    }
}

