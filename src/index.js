import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppRoute} from "./routes/App.route";
import {Provider} from "react-redux";
import {store} from './redux/store';
import "assets/styles/global.style.scss"
import {ThemeProvider} from "@mui/material";
import {LightTheme} from 'assets/styles/themes/light/light.theme'
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl"
import {prefixer} from "stylis";
import {CacheProvider} from "@emotion/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const cacheRtl = createCache({
    key : "muirtl" ,
    stylisPlugins : [prefixer , rtlPlugin] ,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={LightTheme}>
                <AppRoute/>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </ThemeProvider>
        </CacheProvider>
    </Provider>
);

