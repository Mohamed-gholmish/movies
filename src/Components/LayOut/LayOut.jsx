import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import styles from './LayOut.module.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function LayOut({setUserData,userData}) {
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }
  return (
    <>
     <NavBar userData={userData}logOut = {logOut} />
     <Outlet/>
     <Toaster/>
     <Footer/>
    </>
  )
}
