import {orderReducer} from './reducers/orderReducer'
import {combineReducers, createStore} from "redux";

const reducers = combineReducers({
    orderState : orderReducer
})

export const store = createStore(reducers)