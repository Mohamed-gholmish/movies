import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { cartContext } from "../../Context/CartContext";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  let { getLoggedCart } = useContext(cartContext);
  async function getCart() {
    let response = await getLoggedCart();
    console.log(response);
    setCartDetails(response.data.data);
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <div className="container">
        <div className="bg-main-light p-4 my-4">
          <h5>Shop Cart </h5>

          {cartDetails !== null ? (
            <div className="item">
              {" "}
              <h6>{cartDetails.totalCartPrice}</h6>
              {cartDetails.products.map((product) => {
                return (
                  <div className="row my-4">
                    <div className="col-md-2 ">
                      {" "}
                      <img
                        src={product.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-10">
                      <div className="box d-flex justify-content-between">
                        <div>
                          <h6>{product.product.title}</h6>
                          <h6>{product.price}</h6>
                          <button className="btn btn-outline-danger text-dark px-2">
                            {" "}
                            <i className="fa-solid fa-trash "></i> Remove
                          </button>
                        </div>
                        <div>
                      
                        
                          <button className="btn border-main text-dark px-2">
                            +
                            {" "} </button>
                            <span className="mx-2">{product.count}</span>

                         
                          <button className="btn border-main text-dark px-2">
                          {" "}
                        -
                        </button>
                        </div>

                        
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
