import React from 'react';
import style from './_Header.module.scss' ;
import {Link} from "react-router-dom";
import {PATH} from "configs/path.config";
import {Container} from "@material-ui/core";
import logoImage from 'assets/image/png/logo.png'
import {LightTheme} from "assets/styles/themes/light/light.theme";
import IconButton from "@mui/material/IconButton";
import Badge from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router";

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export const HeaderComponent = (props) => {
    const navigate = useNavigate()
    return (
        <div className={style.header}>
            <Container>
                <div className={style.wrapper}>
                    <div className={style.rightHead}>
                        <Link to={PATH.HOME}><img src={logoImage}/></Link>
                        <Link to={PATH.HOME}><h1>فروشگاه پاپیون گالری</h1></Link>
                    </div>
                    <div className={style.leftHead}>
                        <Link style={{backgroundColor: LightTheme.palette.button}}
                              to={PATH.LOGIN}>ورود</Link>
                        <Link style={{backgroundColor: LightTheme.palette.button}}
                              to={PATH.CATEGORIES}>دسته بندی</Link>
                        <IconButton aria-label="cart"
                                    className={style.cartIcon}
                                    onClick={() => navigate(PATH.CART)}
                        >
                            <StyledBadge badgeContent={1}
                                         color="secondary"
                                         className={style.containerIcon}
                            >
                                <ShoppingCartIcon className={style.icon}/>
                            </StyledBadge>
                        </IconButton>
                    </div>
                </div>
            </Container>
        </div>

    );
};

