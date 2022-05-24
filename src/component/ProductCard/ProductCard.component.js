import React from 'react';
import style from './_ProductCard.module.scss'
import {REACT_APP_BASE_URL} from "configs/variables.config";
import {Link} from "react-router-dom";

export const ProductCardComponent = (props) => {
    return (
        <Link to={"/product?id=" + props.id} className={style.cardLink}>
            <div>
                <div className={style.productCard}>
                    <div className={style.productImage}><img src={REACT_APP_BASE_URL + "/files/" + props.image}/></div>
                    <span className={style.name}>{props.name}</span>
                    <span>{new Intl.NumberFormat().format(+props.price)} تومان</span>
                    {props.count<6 && (props.count>0 ? <span className={style.count}>تنها {props.count} عدد در انبار باقی مانده است</span> : <span className={style.count}>اتمام موجودی محصول موردنظر</span>)}
                    <button>افزودن به سبد خرید</button>
                </div>
            </div>
        </Link>

    );
};

