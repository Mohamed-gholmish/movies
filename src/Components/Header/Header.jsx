import React from 'react'
import styles from './Header.module.scss'
import banner from '../../assets/images/game-over.jpeg'
export default function Header() {
  return (
 <>
 <div className=".header-image mb-5 "><img src={banner} alt=""  className='w-100'/></div>
 
 </>
  )
}
