import styles from './Login.module.css'
import React, { useState } from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
// import ForgetPassword from '../ForgetPassword/ForgetPassword';
const baseUrl = 'https://route-ecommerce.onrender.com'
export default function Login({saveUserData}) {

let navigate = useNavigate ();
const [errMessage,setErrMessage] = useState('');
const [loading,setLoading] = useState(false);

async function sendData(values){
    setLoading(true);
  let {data} = await axios.post(`${baseUrl}/api/v1/auth/signin`,values).catch((err)=>{
    setLoading(false);
    console.log(err)
    setErrMessage(err.response.data.message); 
  })
console.log(data)
  if (data.message ==='success'){
    setLoading(true);
    localStorage.setItem('userToken',data.token);
    saveUserData();
    navigate('/home');
  }
}




let myValidation = Yup.object({
  email :Yup.string().required('Email is Required').email('Enter Valid Email'),
  password :Yup.string().required('Password is Required'),
})

  let formik = useFormik({
    initialValues: {
        email:'',
        password:'',
    },
    validationSchema : myValidation,
    onSubmit:sendData
  });
  return (
    <div className=' w-75 mx-auto py-5'>
    <h2 className=' text-center'> Log in Form </h2>
  { errMessage.length > 0 ?< div className='alert alert-danger '>{errMessage}</div> : null}
      <form  onSubmit={formik.handleSubmit}>
      <label htmlFor="email" className=' fs-4'> Email :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className=' form-control my-2' name='email' id="email" value={formik.values.email}/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null }

        <label htmlFor="password" className=' fs-4'> Password :</label>
        <input  onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className=' form-control my-2' name='password' id="password" value={formik.values.password}/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null }
       <div><Link to='/forget-password'className='text-main'> ForgetPassword ?</Link></div> 
        {loading ? <button className=' text-white btn bg-main my-5' ><i className=' fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} className=' text-white btn bg-main my-5' type='submit'>Submit</button>}
      </form>
    </div>)
}
