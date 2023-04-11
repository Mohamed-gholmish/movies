import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
const baseUrl = "https://route-ecommerce.onrender.com";

export default function ProductDetails() {
  let [dataObj,setData] = useState({});
  let {id} = useParams();
  let myId;
async function getData(id){
let {data} = await axios.get(`${baseUrl}/api/v1/products/${id}`)
setData(data.data);
}

 useEffect(()=>{
  myId = id;
getData(myId);
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
