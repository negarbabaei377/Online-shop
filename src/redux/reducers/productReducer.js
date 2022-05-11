import {PRODUCT_GET_PRODUCT} from "configs/variables.config";


const initialState ={
    product : []
}

export const productReducer = (state = initialState , action)=>{
    switch (action.type){
        case (PRODUCT_GET_PRODUCT):
            return {...state , product : action.payload}
        default :
            return state
    }
}