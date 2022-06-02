import {ORDERS_GET_ORDERS, ORDERS_POST_ORDERS} from "configs/variables.config";
import {OrdersApi, postOrder} from "api/orders.api";
import {ORDERS} from "configs/endpoint.config";

const OrderAction = (data) => ({type: ORDERS_GET_ORDERS, payload: data})
const OrderPostAction = (data) =>({type:ORDERS_POST_ORDERS , payload:data})

export const getOrders = () => {
    return (dispatch, getState) => {
        return OrdersApi(ORDERS).then(res => {
            dispatch(OrderAction(res.data))
            return res
        }).catch(error => Promise.reject(error))
    }
}

export const postOrders = (data) => {
    return (dispatch, getState) => {
        return postOrder(data).then(res => {
            dispatch(OrderPostAction(res.data))
            return res
        }).catch(error => Promise.reject(error))
    }
}
