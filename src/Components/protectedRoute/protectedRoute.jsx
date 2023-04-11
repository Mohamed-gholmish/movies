import React from 'react'
import { Navigate } from 'react-router-dom';
import styles from './protectedRoute.module.scss'
export default function ProtectedRoute(props) {
  console.log(props);
  if(localStorage.getItem('userToken') === null){
    return(<Navigate to={'/login'}/>) 
  }else{
    return props.children
  }


}
