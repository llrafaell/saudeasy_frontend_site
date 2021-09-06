import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from "./app/App";
import config from './config';
import './app/assets/scss/style.scss';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();