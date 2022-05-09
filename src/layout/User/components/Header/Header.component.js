import React from 'react';
import style from './_Header.module.scss' ;
import {Link} from "react-router-dom";
import {PATH} from "configs/path.config";
import {Container} from "@material-ui/core";
import logoImage from 'assets/image/png/logo.png'
import {LightTheme} from "assets/styles/themes/light/light.theme";

export const HeaderComponent = (props) => {
    return (
        <div className={style.header}>
            <Container>
                <div className={style.wrapper}>
                    <div className={style.rightHead}>
                        <Link to={PATH.HOME}><img src={logoImage}/></Link>
                        <Link to={PATH.HOME}><h1>فروشگاه پاپیون گالری</h1></Link>
                    </div>
                    <div className={style.leftHead}>
                        <Link style={{backgroundColor:LightTheme.palette.button}} to={PATH.LOGIN}>ورود</Link>
                        <Link style={{backgroundColor:LightTheme.palette.button}} to={PATH.CART}>سبد خرید</Link>
                    </div>
                </div>
            </Container>
        </div>

    );
};

