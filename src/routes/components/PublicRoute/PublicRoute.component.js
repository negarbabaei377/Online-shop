import React from 'react';
import {AdminLayout, UserLayout} from "layout";
import {DEFAULT_PROPS, PROPS_TYPES} from "configs/route.config";

const TargetPage = ({Component, Layout, hasLayout}) => {
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


export const PublicRoute = (props) => {
    const {Component, Layout, hasLayout} = props
    return (
        <TargetPage Component={Component}
                    hasLayout={hasLayout}
                    Layout={Layout}/>
    );
};

PublicRoute.defaultProps = DEFAULT_PROPS;
PublicRoute.propTypes = PROPS_TYPES ;

