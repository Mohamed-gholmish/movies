import React from "react";
import styles from "./ForgetPassword.module.scss";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const baseUrl = "https://route-ecommerce.onrender.com";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(true);
  const [errMessage, setErrMessage] = useState('');

  let navigat = useNavigate();
  let validation = Yup.object({
    email: Yup.string()
      .required("email is required")
      .matches(
        /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
        "enter valid email ={" >
          "} example.email1234%+test@example-subdomain.com"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: sendData,
  });
  async function sendData(values) {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, values)
      .catch((err) => {});
    if (data.statusMsg === "success") {
      setSentEmail(data.message);
      //  navigat('/reset-password');
      setLoading(false);
      setResetPassword(false);
    }
  }

  let formik1 = useFormik({
    initialValues: {
      resetCode:"",
    },
    onSubmit: sendResetcode});
    
  async function sendResetcode(values) {
    console.log(values);
    setLoading(true);
    let  data  = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, values).catch((err) => {setErrMessage(err.response.data.message); console.log(err); setLoading(false);});
   console.log(data);
    if (data.data.status === "Success") {
      setLoading(false);
      navigat('/reset-password');
    }
  }
  return (
    <div className="container my-5 w-75">
      {resetPassword ? (
        <>
          {" "}
          <h2>Forget Password Form</h2>
          {sentEmail > 0 ? <div className=" bg-main">{sentEmail}</div> : null}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email"> Email :</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}
            {!loading ? (
              <button type="submit" className="btn bg-main mt-5">
                {" "}
                Submit
              </button>
            ) : (
              <button type="submit" className="btn bg-main mt-5 ">
                <i className="fas fa-spinner fa-spin"></i>{" "}
              </button>
            )}
          </form>{" "}
        </>
      ) : (
        <>
          {" "}
          <h2>Reset Password Form</h2>
          {errMessage !== '' ? <div className=" alert alert-danger">{errMessage}</div> : null}
          <form onSubmit={formik1.handleSubmit}>
            <label htmlFor="resetCode"> Reset Code :</label>
            <input
              onChange={formik1.handleChange}
              onBlur={formik1.handleBlur}
              type="text"
              id="resetCode"
              name="resetCode"
              className="form-control"
              value={formik1.values.resetCode}
            />
            {formik1.errors.resetCode && formik1.touched.resetCode ? (
              <div className="alert alert-danger">
                {formik1.errors.resetCode}
              </div>
            ) : null}
            {!loading ? (
              <button type="submit" className="btn bg-main mt-5">
                {" "}
                Verfiy Code
              </button>
            ) : (
              <button type="submit" className="btn bg-main mt-5 ">
                <i className="fas fa-spinner fa-spin"></i>{" "}
              </button>
            )}
          </form>{" "}
        </>
      )}
    </div>
  );
}
