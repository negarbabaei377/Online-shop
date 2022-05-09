import React from 'react';
import style from './_Orders.module.scss'
import {Container} from "@mui/material";
import {StickyHeadTable} from "./component/index";
import {LightTheme} from "assets/styles/themes/light/light.theme";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

export const OrdersPage = (props) => {
    return (
        <div>
            <Container>
                <div className={style.title}>
                    <h1>مدیریت سفارش ها</h1>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"

                    >
                        <FormControlLabel value="سفارش های تحویل داده شده"
                                          control={<Radio style={{color:LightTheme.palette.button}}/>}
                                          label="سفارش های تحویل داده شده"/>
                        <FormControlLabel value="سفارش های در انتظار ارسال"
                                          control={<Radio style={{color:LightTheme.palette.button}}/>}
                                          label="سفارش های در انتظار ارسال"/>
                    </RadioGroup>
                </div>
                <StickyHeadTable/>
            </Container>
        </div>
    );
};

