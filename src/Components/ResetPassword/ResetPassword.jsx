import styles from './ResetPassword.module.scss'
import React, { useState } from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
// import ForgetPassword from '../ForgetPassword/ForgetPassword';

const baseUrl = 'https://route-ecommerce.onrender.com'
export default function ResetPassword() {
let navigate = useNavigate ();
const [errMessage,setErrMessage] = useState('');
const [loading,setLoading] = useState(false);

async function sendData(values){
    setLoading(true);
  let {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`,values).catch((err)=>{
    setLoading(false);
    console.log(err)
    setErrMessage(err.response.data.errors.msg); console.log(err);
  })
  console.log(data);
 

  if (data.token){
    setLoading(true);
    navigate('/login');
  }
}




let myValidation = Yup.object({
  email :Yup.string().required('Email is Required').email('Enter Valid Email'),
  newPassword :Yup.string().required('Password is Required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,'must contain one capital letter and numbers'),
})

  let formik = useFormik({
    initialValues: {
        email:'',
        newPassword:'',
    },
    validationSchema : myValidation,
    onSubmit:sendData
  });
  return (
    <div className=' w-75 mx-auto py-5'>
    <h2 className=' text-center'>Reset Password Form : </h2>
  { errMessage.length > 0 ?< div className='alert alert-danger '>{errMessage}</div> : null}
      <form  onSubmit={formik.handleSubmit}>
      <label htmlFor="email" className=' fs-4'> Email :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className=' form-control my-2' name='email' id="email" value={formik.values.email}/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null }

        <label htmlFor="newPassword" className=' fs-4'> new Password :</label>
        <input  onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className=' form-control my-2' name='newPassword' id="newPassword" value={formik.values.newPassword}/>
        {formik.errors.newPassword && formik.touched.newPassword? <div className="alert alert-danger">{formik.errors.newPassword}</div> : null }
        {loading ? <button className=' text-white btn bg-main my-5' ><i className=' fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} className=' text-white btn bg-main my-5' type='submit'>Submit</button>}
      </form>
    </div>)
 
}
