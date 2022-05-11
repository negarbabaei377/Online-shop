import {productReducer} from './reducers/productReducer'
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {categoryReducer} from "./reducers/categoryReducer";
import {orderReducer} from "./reducers/orderReducer";

const reducers = combineReducers({
    productState : productReducer ,
    categoryState : categoryReducer,
    orderState : orderReducer
})

export const store = createStore(reducers , applyMiddleware(thunk))