import axios from "axios";
import { createContext } from "react";

const baseUrl = "https://route-ecommerce.onrender.com";

export let cartContext = createContext();

export default function CartContextProvider(props){
    let userToken = localStorage.getItem('userToken');
    function addToCart(id){

        return axios.post(`${baseUrl}/api/v1/cart`,{productId:id},{headers:{Token:userToken}})
        .then((response)=>response)
        .catch((err)=>err)
    }
    function getLoggedCart(){

        return axios.get(`${baseUrl}/api/v1/cart`,{headers:{Token:userToken}})
        .then((response)=>response)
        .catch((err)=>err)
    }

    return<cartContext.Provider value={{addToCart,getLoggedCart}}>
        {props.children}
    </cartContext.Provider>

}