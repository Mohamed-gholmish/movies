import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useApi(url) {
    let [dataList , setData] = useState([])
    async function getData(){
        let{data} = await axios.get(url)
        setData(data.data)
    }
    useEffect(()=>{
        getData()
    })
  return {dataList};
}
