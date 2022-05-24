import {PRODUCT_GET_PRODUCT, PRODUCT_GET_SINGLE_PRODUCT} from "configs/variables.config";


const initialState ={
    product : [],
    singleProduct:[]
}

export const productReducer = (state = initialState , action)=>{
    switch (action.type){
        case (PRODUCT_GET_PRODUCT):
            return {...state , product : action.payload}
        case (PRODUCT_GET_SINGLE_PRODUCT):
            return {...state , singleProduct : action.payload}
        default :
            return state
    }
}