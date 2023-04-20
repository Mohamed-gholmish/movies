import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
export default function GameDetails() {
  let [dataObj,setData] = useState({});
  let {id} = useParams();
  let myId;
  const options = {
    method: 'GET',
    params: {id: `${myId}`},
    headers: {
          'X-RapidAPI-Key': '620a167456mshdfb6e2440b7333ap12704cjsnf0a180a0a8a6',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }}
  async function getGameDetails(myId) {
    let { data } = await axios.get( `https://free-to-play-games-database.p.rapidapi.com/api/games`,options);
    console.log(data);
   
  }
 useEffect(()=>{
  myId = id;
getGameDetails(myId);
 },[])

  return (
 <>
 <div className="container my-5">
     <div className='row d-flex align-items-center'>
      <div className="col-md-4">
        <img src={dataObj.imageCover} className='w-100' alt=""/>
      </div>
      <div className="col-md-8">
         <div className="product-info">
          <p>{dataObj.title}</p>
          <p className='text-muted'>{dataObj.description}</p>
          {/* {dataObj.category.name !== null ? <p><span className='text-main '>category</span> :{dataObj.category.name}</p> :null} */}
          {/* <p><span className='text-main '>category</span> :{dataObj.category.name}</p>
          <p><span className='text-main '>Brands</span> :{dataObj.brand.name}</p> */}
          <div className="box d-flex justify-content-between">
            <span>{dataObj.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></span>
            <span>{dataObj.price}EGP</span>
          </div>
          <button className='w-100 btn bg-main text-white my-3'>+ Add to Cart</button>
         </div>
      </div>
    </div>
    </div>
 </>
  )
}
