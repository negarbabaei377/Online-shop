import React from 'react';
import style from './_PriceQuantity.module.scss'
import {Container} from "@mui/material";
import {StickyHeadTable} from "./component/index";
import {LightTheme} from "assets/styles/themes/light/light.theme";

export const PriceQuantityPage = (props) => {
    return (
        <div>
            <Container>
                <div className={style.title}>
                    <h1>مدیریت موجودی و قیمت ها</h1>
                    <button
                        className={style.buttonHover}
                        style={{backgroundColor: LightTheme.palette.button}}>ذخیره
                    </button>
                </div>
                <StickyHeadTable/>
            </Container>
        </div>
    );
};


