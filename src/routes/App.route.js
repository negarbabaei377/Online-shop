import React from 'react';
import {BrowserRouter, Route , Routes} from "react-router-dom";
import {PATH} from "configs/path.config";
import {PrivateRoute, ProtectedRoute, PublicRoute} from "./components";
import * as Pages from 'pages'

export const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATH.HOME} element={<PublicRoute Component={Pages.HomePage}/>} />
                <Route path={PATH.CART} element={<PublicRoute Component={Pages.CartPage}/>} />
                <Route path={PATH.CATEGORIES} element={<PublicRoute Component={Pages.CategoryPage}/>} />
                <Route path={PATH.CHECKOUT} element={<PublicRoute Component={Pages.CheckoutPage}/>} />
                <Route path={PATH.DASHBOARD} element={<PrivateRoute Component={Pages.DashboardPage} Layout={"Admin"}/>} >
                    <Route pat={PATH.ORDERS} element={<PrivateRoute Component={Pages.OrdersPage} Layout={"Admin"}/> }/>
                    <Route pat={PATH.PRICEQUANTITY} element={<PrivateRoute Component={Pages.PriceQuantityPage} Layout={"Admin"}/> }/>
                    <Route pat={PATH.PRODUCTMANAGMENT} element={<PrivateRoute Component={Pages.ProductManagmentPage} Layout={"Admin"}/> }/>
                </Route>
                <Route path={PATH.LOGIN} element={<ProtectedRoute Component={Pages.LoginPage}/>} />
                <Route path={PATH.NOTFOUND} element={<PublicRoute Component={Pages.NotfoundPage}/>} />
                <Route path={PATH.PRODUCT} element={<PublicRoute Component={Pages.ProductPage}/>} />
            </Routes>
        </BrowserRouter>
    );
};

