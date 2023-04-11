import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import styles from "./Categories.module.scss";

const baseUrl = "https://route-ecommerce.onrender.com";
export default function Categories() {
  const [categories, setCat] = useState([]);
  async function getAllCategories() {
    let { data } = await axios.get(`${baseUrl}/api/v1/categories`);
    setCat(data.data);
  }
  useEffect(() => {
    getAllCategories();
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="row">
        <Slider {...settings}>
          {categories.map((cat)=>{
            return  <div key={cat._id} className="col-md-3">
              <img src={cat.image} alt="" className="w-100 " height={200} />
            </div>
          })}
        </Slider>
      </div>
    </>
  );
}
