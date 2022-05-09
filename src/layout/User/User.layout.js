import React from 'react';
import {HeaderComponent, FooterComponent} from "./components/index";

export const UserLayout = (props) => {
    return (
        <>
            <HeaderComponent/>
            {props.children}
            <FooterComponent/>
        </>
    );
};
