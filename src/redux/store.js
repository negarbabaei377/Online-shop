import {productReducer} from './reducers/productReducer'
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {categoryReducer} from "./reducers/categoryReducer";
import {orderReducer} from "./reducers/orderReducer";
import {cartReducer} from "./reducers/cartReducer";
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers = combineReducers({
    productState : productReducer ,
    categoryState : categoryReducer,
    orderState : orderReducer ,
    cartState : cartReducer
})

export const store = createStore(reducers ,composeWithDevTools(applyMiddleware(thunk)))