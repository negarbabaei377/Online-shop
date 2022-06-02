import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import { Icon } from '@iconify/react';
import style from './_payment.module.scss'
import {ORDER, ORDERS} from "configs/variables.config";
import {useDispatch, useSelector} from "react-redux";
import {postOrders} from "redux/actions/orderAction";
import {cartAction} from "redux/actions/cartAction";
import {getProduct, putProductsData} from "../../redux/actions/productAction";

export const PaymentPage = () => {
    const [result, setResult] = useSearchParams()
    const [order , setOrder] = useState()

    const dispatch = useDispatch()
    useEffect(()=>{
        if(result.get("status") === "success"){
            const information =JSON.parse(localStorage.getItem(ORDERS))
            information.orderDate = Date.now()
            dispatch(postOrders(information))
            setOrder(JSON.parse(localStorage.getItem(ORDER)))
            dispatch(getProduct())
            localStorage.removeItem(ORDERS)
            localStorage.removeItem(ORDER)
            dispatch(cartAction(0))
        }
    },[])

    const productStore = useSelector(state => state.productState).product
    const productData = order?.map((item) => {
        const product = productStore?.find((data) => data.id == item.id)
        dispatch(putProductsData( item.id ,{...product , count : (+product?.count)-(+item?.count)}))
    })

    return (
        <div className={style.sheet}>
            {
                result.get("status") === "success" ?
                    <div className={style.result}>
                        <Icon icon="clarity:success-standard-line" color="#65a30d" width="200" />
                        <div>با تشکر از پرداخت شما ، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد !</div>
                    </div>
                    :
                    <div className={style.result}>
                        <Icon icon="material-symbols:cancel-outline-rounded" color="#dc2626" width="200"/>
                        <div>پرداخت موفقیت آمیز نبود ، سفارش شما در انتظار پرداخت است !</div>
                    </div>
            }
        </div>
    );
};

