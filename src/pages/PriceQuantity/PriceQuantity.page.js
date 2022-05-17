import React from 'react';
import style from './_PriceQuantity.module.scss'
import {Container} from "@mui/material";
import {PriceQuantityComponent} from './component'

export const PriceQuantityPage = (props) => {
    return (
        <div>
            <Container>
                <div className={style.title}>
                    <h1>مدیریت موجودی و قیمت ها</h1>
                </div>
                <PriceQuantityComponent/>
            </Container>
        </div>
    );
};


