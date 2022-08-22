// import { SHOW_MOVIES } from "../constants" 
// import { WATCH_LATER } from "../constants"
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils";

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
        dispatch({ type: 'CART_ADD_ITEMS' ,payload:{id }});

      }
    
}
export const removefromcart = (id) =>{
    return (dispatch)=>{
      dispatch({ type: 'REMOVE_CART_ITEM' ,payload:{id}});

    } 
}  
 export const signin = (data)=>{
   return (dispatch)=>{
     dispatch({type:"SIGN_IN" ,payload:data})
   }
 }
export const signout=()=>{
  return (dispatch)=>{
    dispatch({type:"SIGN_OUT"})
    localStorage.removeItem("userinfo")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem('paymentMethod')
  }
   


  }

  export const saveshipping=(data)=>{
    return (dispatch)=>{
      dispatch({type:'SAVE_SHIPPING' ,payload:data})
    }
  }


  export const savepaymentmethod= (data)=>{
    return (dispatch)=>{
      dispatch({type:'SAVE_PAYMENT_METHOD',payload:data})
    }

  }


  export const placeorder = (data)=>{
    return (dispatch)=>{
      dispatch({type:'CREATE_REQUEST'})
console.log(data);
      try {
        const result = axios({
          method: 'post',
          url: '/api/orders',
          data:{
            orderitems:data.CartsItems,
            shippingAddress:data.shippingAddress,
            paymentMethod:data.paymentMethod,
            itemsPrice:data.itemprice,
            shippingprice:data.Shippingprice,
            taxprice:data.taxprice,
            totalprice:data.totalprice,
          },
          headers: {
            authorization:`Bearer ${data.userInfo.token}`
          }
  
        })
          .then(function (response) {
            console.log(response);
            dispatch({ type: 'CREATE_SUCESS'});
          })
  
      } catch (error) {
        dispatch({ type: 'CREATE_FAIL'})
        toast.error(getError(error))
  
      }
    }
  }