import React from 'react'
import styles from './NotFound.module.scss'
import errorImage from '../../assets/images/error.svg';
export default function NotFound() {
  return (
    <>
      <div className="container">
        <div className="w-50 mx-auto my-5"><img src={errorImage} alt=""  className='w-100'/></div>
      </div>
    </>
  )
}
