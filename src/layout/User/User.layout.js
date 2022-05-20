import React from 'react';
import {HeaderComponent, FooterComponent} from "./components/index";

export const UserLayout = (props) => {
    return (
        <div>
            <HeaderComponent/>
            <div style={{margin: "5rem 0"}}>
                {props.children}
            </div>
            <FooterComponent/>
        </div>
    );
};
