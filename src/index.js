import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MainProvider from "./Context/MainContext";

const rootEl = document.getElementById('root');
const render = (Component) => ReactDOM.render(
        <MainProvider>
            <div>
                <Component />
            </div>
        </MainProvider>,
    rootEl
);

render(App);

serviceWorker.unregister();

