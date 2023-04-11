import React from 'react'
import styles from './Header.module.scss'
import banner from '../../assets/images/grocery-banner.png'
export default function Header() {
  return (
 <>
 <div className="vh-100"><img src={banner} alt=""  className='w-100'/></div>
 
 </>
  )
}
