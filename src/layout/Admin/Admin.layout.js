import React from 'react';
import {HeaderComponent} from "./components";

export const AdminLayout = (props) => {
    return (
        <>
            <HeaderComponent/>
            {props.children}
        </>
    );
};

