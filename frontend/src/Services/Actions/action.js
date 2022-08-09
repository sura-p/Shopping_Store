// import { SHOW_MOVIES } from "../constants" 
// import { WATCH_LATER } from "../constants"
import axios from "axios";
import Product from "../../Component/Product";
// import {APIkey} from "../../Common/APIs/MovieApiKey";
 
export const fetchdata =  () => { 
    return (dispatch)=>{
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const result = axios({
        method: 'get',
        url: '/api/products',
        headers: {
          'Content-Type': 'application/json'
        }

      })
        .then(function (response) {
          dispatch({ type: 'FETCH_SUCESS', payload: response.data });
        })

    } catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: error.message })

    }
}

 


  }

  export const addtocart = (id) =>{
      return (dispatch)=>{
        dispatch({ type: 'CART_ADD_ITEMS' ,payload:{id}});

      }
    
}
export const removefromcart = (id) =>{
    return (dispatch)=>{
      dispatch({ type: 'REMOVE_CART_ITEM' ,payload:{id}});

    } 
}  
//  
//export const watch_later=(data)=>{
     
//     return {
//        type:WATCH_LATER,
//         data:data       
//     }
