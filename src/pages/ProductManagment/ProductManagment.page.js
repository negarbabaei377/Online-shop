import React from 'react';
import style from './_ProductManagment.module.scss'
import {Container} from "@mui/material";
import {StickyHeadTable} from "./component/index";
import {LightTheme} from "assets/styles/themes/light/light.theme";

export const ProductManagmentPage = (props) => {
    return (
        <div>
            <Container>
                <div className={style.title}>
                    <h1>مدیریت کالاها</h1>
                    <button
                        className={style.buttonHover}
                        style={{backgroundColor: LightTheme.palette.button}}>افزودن کالا
                    </button>
                </div>
                <StickyHeadTable/>
            </Container>
        </div>
    );
};

