import React from 'react';
import {FooterComponent, HeaderComponent} from "./components";

export const AdminLayout = (props) => {
    return (
        <>
            <HeaderComponent/>
            {props.children}
            <FooterComponent/>
        </>
    );
};

