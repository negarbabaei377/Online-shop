import React from 'react';
import {Link} from "react-router-dom";
import {PATH} from "configs/path.config";
import {Button, ButtonGroup, Container} from "@material-ui/core";
import style from './_Header.module.scss';
import {useNavigate} from "react-router";
import {LightTheme} from "assets/styles/themes/light/light.theme";

export const HeaderComponent = (props) => {
    const navigate = useNavigate()
    return (
        <div className={style.admin}>
            <Container>
                <div className={style.wrapper}>
                    <h1>پنل مدیریت فروشگاه پاپیون گالری</h1>
                    <ButtonGroup size="large" variant='contained' aria-label="outlined button group">
                        <Button style={{backgroundColor: LightTheme.palette.button , fontSize:"1.3rem"}} onClick={()=>navigate(PATH.PRODUCTMANAGMENT)}>کالاها</Button>
                        <Button style={{backgroundColor: LightTheme.palette.button , fontSize:"1.3rem" , marginRight:"0.1rem"}} onClick={()=>navigate(PATH.PRICEQUANTITY)}>موجودی و قیمت ها</Button>
                        <Button style={{backgroundColor: LightTheme.palette.button, fontSize:"1.3rem" , marginRight:"0.1rem"}}onClick={()=>navigate(PATH.ORDERS)}>سفارش ها</Button>
                    </ButtonGroup>
                    <div>
                        <Link to={PATH.HOME}>بازگشت به سایت</Link>
                        <button onClick={()=> {
                            navigate()

                        }}>خروج</button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

