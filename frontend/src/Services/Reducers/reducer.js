// import { SHOW_MOVIES, WATCH_LATER } from "../constants";

const initialState = {
  products: [],
  loading: true,
  error: "",
  CartsItems: localStorage.getItem('Cartitems')?JSON.parse(localStorage.getItem('Cartitems')):[],
  userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,
  shippingAddress:localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{},
  paymentMethod:localStorage.getItem('payment_method')?localStorage.getItem('payment_method'):''
};

export function FETCH(state = initialState, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CART_ADD_ITEMS":
      const data = state.products.find((item) => item._id === action.payload.id);
      const Cart = state.CartsItems.find((item) =>
      item._id === action.payload.id ? true : false
    );
      if(Cart?.qty>data?.countInStock){

        window.alert("out of stock")
       return{...state,CartsItems:[...state.CartsItems]}
      }
      else{
        const inCart = state.CartsItems.some((item) =>
        item._id === action.payload.id ? true : false
      );
      
      // data[0].quantity = action.payload.quantity;
      const a = inCart
      ? state.CartsItems.map((item) =>
    
          item._id === action.payload.id
            ? { ...item, qty: item.qty+=1 }
            : item
        )
      : [...state.CartsItems, { ...data, qty: 1 }]
      localStorage.setItem('Cartitems',JSON.stringify(a));
      return {
        ...state,
        CartsItems:a 
      };

      }
      
      case "CART_ADD_REMOVE_ITEMS":
        const data1 = state.products.find((item) => item._id === action.payload.id);
        const Cart1 = state.CartsItems.find((item) =>
        item._id === action.payload.id ? true : false
      );
        if(Cart1?.qty>data1?.countInStock){
  
          window.alert("out of stock")
         return{...state,CartsItems:[...state.CartsItems]}
        }
        else{
          const inCart = state.CartsItems.some((item) =>
          item._id === action.payload.id ? true : false
        );
        
        // data[0].quantity = action.payload.quantity;
        const a = inCart
        ? state.CartsItems.map((item) =>
      
            item._id === action.payload.id
              ? { ...item, qty: item.qty-=1 }
              : item
          )
        : [...state.CartsItems, { ...data, qty: 1 }]
        localStorage.setItem('Cartitems',JSON.stringify(a));
        return {
          ...state,
          CartsItems:a 
        };
  
        }
        
    // console.log(data[0].quantity);

    case "REMOVE_CART_ITEM":
      
    return{
      ...state,CartsItems:state.CartsItems.filter(item=> item._id !== action.payload.id)
    }

    case "SIGN_IN":

    return{
              ...state,userInfo:action.payload
    }

    case "SIGN_OUT":

      return{
                ...state,userInfo:null
      }

    case "SAVE_SHIPPING":
      return {
        ...state,shippingAddress:action.payload
      }  

      case 'SAVE_PAYMENT_METHOD':
                   return{
                       ...state,
                       paymentMethod:action.payload
                   }
    default:
      return state;
  }
}
