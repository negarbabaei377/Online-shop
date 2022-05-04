import React from 'react';
import {Outlet} from 'react-router-dom'

export const DashboardPage = (props) => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

