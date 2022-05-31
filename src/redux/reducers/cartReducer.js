import {CART_CHANGE_STATE, ORDER} from "configs/variables.config";

const getLocal = localStorage.getItem(ORDER) === null ? 0 : JSON.parse(localStorage.getItem(ORDER)).length
const initial = {
    cart: getLocal
}

export const cartReducer =(state=initial , action)=>{
    switch (action.type){
        case(CART_CHANGE_STATE):
            return {...state , cart:action.payload}
        default:
            return state
    }
}