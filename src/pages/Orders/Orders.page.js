import React, {useEffect, useState} from 'react';
import style from './_Orders.module.scss'
import {Container} from "@mui/material";
import {LightTheme} from "assets/styles/themes/light/light.theme";
import {FormControlLabel, Radio, RadioGroup, useRadioGroup} from "@material-ui/core";
import {styled} from '@mui/material/styles';
import {OrderTableComponent} from "./component";

export const OrdersPage = (props) => {
    const [values , setValues] = useState(5)

    const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
        ({theme, checked}) => ({
            '.MuiFormControlLabel-label': {
                fontSize: "1.2rem",
            },
        }),
    );
    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();
        let checked = false;
        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    return (
        <div>
            <Container>
                <div className={style.title}>
                    <h1>مدیریت سفارش ها</h1>
                    <RadioGroup
                        onChange={(event)=>setValues(event.target.value)}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="5"
                    >
                        <MyFormControlLabel value="1"
                                          control={<Radio style={{color:LightTheme.palette.button}}/>}
                                          label="سفارش های تحویل داده شده"
                        />
                        <MyFormControlLabel value="5"
                                          control={<Radio style={{color:LightTheme.palette.button}}/>}
                                          label="سفارش های در انتظار ارسال"/>
                    </RadioGroup>
                </div>
                <OrderTableComponent filtering={values}/>
            </Container>
        </div>
    );
};

