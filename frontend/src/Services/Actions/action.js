// import { SHOW_MOVIES } from "../constants" 
// import { WATCH_LATER } from "../constants"
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils";


import Product from "../../Component/Product";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { browserHistory } from "../..";
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




  export const fetchorder = (data)=>{
    
    return (dispatch)=>{
      
      dispatch({type:'FETCH_REQUEST'})
      try {
        const result = axios({
          method: 'get',
          url: `/api/orders/${data.id}`,
          
          headers: {
            authorization:`Bearer ${data.userInfo.token}`
          }
  
        })
          .then(function (response) {
            console.log(response);
            dispatch({ type: 'FETCH_SUCCESS',payload:response.data});
          })
      } catch (error) {
        dispatch({type:'FETCH_FAIL' , payload:getError(error)})
      }
    }
  }

  export const pay=(data)=>{
    return(dispatch)=>{
      try {
        dispatch({type:'PAY_REQUEST'})
        axios({
          method:'put',
          url:`/api/orders/${data.id}/pay`,
          
          
            headers:{authorization:`Bearer ${data.user.token}`},
          
            
        }).then((res)=>{
          dispatch({type:'PAY_SUCCESS',payload:res.data})
        toast.success('Order Is Paid')
        
        })
      } catch (error) {
        dispatch({type:'PAY_FAIL',payload:getError(error)})
        toast.error(getError(error))
      }
    }
    
    

  }
  export const orderHistory = (data)=>{
    return (dispatch)=>{
      console.log(data.user.token);
      dispatch({type:'FETCH_HISTORY'})
      try {
        axios({
          method:'get',
          url:'/api/orders/mine',
          headers:{authorization:`Bearer ${data.user.token}`},
        }).then((res)=>{
          console.log(res);
          dispatch({type:'FETCH_HISTORY_SUCCESS',payload:res.data})
        })
      } catch (error) {
        dispatch({type:'FETCH_HISTORY_FAIL',payload:getError(error)})
        
      }

    }
      
  }