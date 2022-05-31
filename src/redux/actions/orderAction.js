import {ORDERS_GET_ORDERS} from "configs/variables.config";
import {OrdersApi} from "api/orders.api";
import {ORDERS} from "configs/endpoint.config";

const OrderAction = (data) => ({type: ORDERS_GET_ORDERS, payload: data})

export const getOrders = () => {
    return (dispatch, getState) => {
        return OrdersApi(ORDERS).then(res => {
            dispatch(OrderAction(res.data))
            return res
        }).catch(error => Promise.reject(error))
    }
}