import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppRoute} from "./routes/App.route";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AppRoute/>
    </Provider>
);

