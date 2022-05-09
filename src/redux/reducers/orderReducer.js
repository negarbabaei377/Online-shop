import {orderAction} from "../actions/orderAction";

const initialState = {
    order : []
}

export const orderReducer = (state = initialState , action) =>{
    switch (action.type) {
        case("x") :
            return {...state , order : action.payload}
        case("y") :
            return {...state , order: action.payload}
        default :
            return state
    }
}