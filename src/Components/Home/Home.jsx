import React from 'react'
import styles from './Home.module.css'
import Header from '../Header/Header'
import FeatureProduct from '../AllGames/AllGames'

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="container"> 
      <h3 className='pb-4 text-center'>All Games</h3>
      <FeatureProduct/>
      </div>

    
    </div>
  )
}
