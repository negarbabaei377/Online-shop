import React from 'react';
import {AdminLayout, UserLayout} from "layout";
import {DEFAULT_PROPS, PROPS_TYPES} from "configs/route.config";
import {IS_LOGIN} from "configs/variables.config";
import {Navigate} from "react-router";
import {PATH} from "configs/path.config";

const TargetPage = ({Component, Layout, hasLayout}) => {
    const isLogin = JSON.parse(localStorage.getItem(IS_LOGIN))
    if (isLogin === true) {
        return <Navigate to={`${PATH.DASHBOARD}/${PATH.ORDERS}`}/>
    }
    return (
        hasLayout ? (
            Layout === "User" ? (
                <UserLayout>
                    <Component/>
                </UserLayout>
            ) : (
                <AdminLayout>
                    <Component/>
                </AdminLayout>
            )
        ) : (
            <Component/>
        )
    );
};


export const ProtectedRoute = (props) => {
    const {Component, Layout, hasLayout} = props
    return (
        <TargetPage Component={Component}
                    hasLayout={hasLayout}
                    Layout={Layout}/>
    );
};

ProtectedRoute.defaultProps = DEFAULT_PROPS;
ProtectedRoute.propTypes = PROPS_TYPES;

