import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App'; 
import './index.css';
import {
  BrowserRouter 
} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store';
import { transitions,Provider as AlertProvider, positions } from "react-alert";
import AlertTemplate  from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
 
