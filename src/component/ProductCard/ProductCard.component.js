import React from 'react';
import style from './_ProductCard.module.scss'
import {REACT_APP_BASE_URL} from "configs/variables.config";
import {PATH} from "configs/path.config";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

export const ProductCardComponent = (props) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className={style.productCard} onClick={()=>navigate(PATH.PRODUCT)}>
                <div className={style.productImage}><img src={REACT_APP_BASE_URL + "/files/" + props.image}/></div>
                <span className={style.name}>{props.name}</span>
                <span>{new Intl.NumberFormat().format(+props.price)} تومان</span>
                <Link to={PATH.PRODUCT}>افزودن به سبد خرید</Link>
            </div>
        </div>
    );
};

