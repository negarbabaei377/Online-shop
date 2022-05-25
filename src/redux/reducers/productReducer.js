import {PRODUCT_GET_PRODUCT, PRODUCT_GET_SINGLE_CATEGORY, PRODUCT_GET_SINGLE_PRODUCT} from "configs/variables.config";


const initialState ={
    product : [],
    singleProduct:[],
    singleCategory:[]
}

export const productReducer = (state = initialState , action)=>{
    switch (action.type){
        case (PRODUCT_GET_PRODUCT):
            return {...state , product : action.payload}
        case (PRODUCT_GET_SINGLE_PRODUCT):
            return {...state , singleProduct : action.payload}
        case (PRODUCT_GET_SINGLE_CATEGORY):
            return {...state , singleCategory : action.payload}
        default :
            return state
    }
}