import React from 'react';
import {Link} from "react-router-dom";
import {PATH} from "configs/path.config";
import image from "assets/image/svg/SADNESS_Fullbody_Render.webp";
import style from './_ProductFound.module.scss'

export const ProductFoundComponent = (props) => {
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.message}>
                    <h1>{props.name} موردنظر شما یافت نشد !</h1>
                    {props.valid === true &&
                        <Link to={PATH.HOME}>بازگشت به صفحه اصلی</Link>
                    }
                </div>
                <div className={style.image}><img src={image}/></div>
            </div>
        </>
    );
};

