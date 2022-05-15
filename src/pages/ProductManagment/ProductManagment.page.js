import React from 'react';
import style from './_ProductManagment.module.scss'
import {Container} from "@mui/material";
import {AddProductComponent, ProductManagementTable} from './component'

export const ProductManagmentPage = (props) => {
    return (
        <div>
            <Container>
                <div className={style.title}>
                    <h1>مدیریت کالاها</h1>
                    <AddProductComponent/>
                </div>
                <ProductManagementTable/>
            </Container>
        </div>
    );
};

