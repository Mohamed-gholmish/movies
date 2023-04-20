import axios from "axios";
import { createContext, useEffect, useState } from "react";
const baseUrl = "https://route-ecommerce.onrender.com";

export let gameContext = createContext();
export default function GameContextProvider(props){
    const [id,setId] = useState(0);
    let userToken = localStorage.getItem('userToken');
   

    return<gameContext.Provider value={{setId}}>
        {props.children}
    </gameContext.Provider>

}