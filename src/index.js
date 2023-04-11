import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<App/>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
)
