import {ORDERS_GET_ORDERS} from "configs/variables.config";

const initialState = {
    orders:[]
}

export const orderReducer =(state=initialState , action)=>{
    switch (action.type){
        case(ORDERS_GET_ORDERS):
            return {...state , orders : action.payload}
        default:
            return state
    }
}