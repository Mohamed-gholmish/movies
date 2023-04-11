import React, { useState } from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './Register.module.scss'
import { useNavigate } from 'react-router-dom';

const baseUrl = 'https://route-ecommerce.onrender.com'

export default function Register() {
  
let navigate = useNavigate ();
const [errMessage,setErrMessage] = useState('');
const [loading,setLoading] = useState(false);

async function sendData(values){
    setLoading(true);
  let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((err)=>{
    setLoading(false);
    setErrMessage(err.response.data.errors.msg)
  })
 
  if (data.message ==='success'){
    setLoading(true);
    navigate('/login');
  }
}




let myValidation = Yup.object({
  name :Yup.string().required('Name is Required').min(3,'min length is 3').max(10,'maxlength is 10'),
  email :Yup.string().required('Email is Required').email('Enter Valid Email'),
  password :Yup.string().required('Password is Required').matches(/^[A-Z][a-z0-9]{6,}$/i,'Password is not a valid'),
  rePassword :Yup.string().required('repassword is Required').oneOf([Yup.ref('password')],'repassword must be match'),
  phone :Yup.string().required('Phone is Required').matches(/^01[1052][0-9]{8}$/i,'Phone is not a valid'),
})

  let formik = useFormik({
    initialValues: {
        name :'',
        email:'',
        password:'',
        rePassword:'',
       phone:'',
    },
    validationSchema : myValidation,
    onSubmit:sendData
  });
  return (
    <div className=' w-75 mx-auto py-5'>
    <h2 className=' text-center'> Regiteration Form </h2>
  { errMessage.length > 0 ?< div className='alert alert-danger '>{errMessage}</div> : null}
      <form  onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className=' fs-4'> Name :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className=' form-control my-2' name='name' id="name" value={formik.values.name}/>
        {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div> : null }
        
        <label htmlFor="email" className=' fs-4'> Email :</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className=' form-control my-2' name='email' id="email" value={formik.values.email}/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null }

        <label htmlFor="password" className=' fs-4'> Password :</label>
        <input  onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className=' form-control my-2' name='password' id="password" value={formik.values.password}/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null }

        <label htmlFor="rePassword" className=' fs-4'> rePassword :</label>
        <input  onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className=' form-control my-2' name='rePassword' id="rePassword" value={formik.values.rePassword}/>
        {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null }

        <label htmlFor="phone" className=' fs-4'> Phone :</label>
        <input  onChange={formik.handleChange} onBlur={formik.handleBlur} type="phone" className=' form-control my-2' name='phone' id="phone" value={formik.values.phone}/>
        {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div> : null }
        {loading ? <button className=' text-white btn bg-main my-5' ><i className=' fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} className=' text-white btn bg-main my-5' type='submit'>Submit</button>}
      </form>
    </div>
  )
}
