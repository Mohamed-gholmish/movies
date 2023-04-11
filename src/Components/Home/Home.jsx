import React from 'react'
import styles from './Home.module.css'
import Header from '../Header/Header'
import Categories from '../Categories/Categories'
import FeatureProduct from '../FeatureProduct/FeatureProduct'

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="container"> 
      <h3 className='pb-4'>Categories</h3>

      <Categories/>
      <h3> Popular Products</h3>
      <FeatureProduct/>
      </div>

    
    </div>
  )
}
