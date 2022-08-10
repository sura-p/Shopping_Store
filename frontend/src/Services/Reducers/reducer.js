// import { SHOW_MOVIES, WATCH_LATER } from "../constants" https://youtu.be/MNs_7avLIJ4;

const initialState = {
  products: [],
  loading: true,
  error: "",
  CartsItems: localStorage.getItem('Cartitems')?JSON.parse(localStorage.getItem('Cartitems')):[]
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
      const data = state.products.find((item) => item.id === action.payload.id);
      const Cart = state.CartsItems.find((item) =>
      item.id == action.payload.id ? true : false
    );
      if(Cart?.qty>data?.countInStock){

        window.alert("out of stock")
       return{...state,CartsItems:[...state.CartsItems]}
      }
      else{
        const inCart = state.CartsItems.some((item) =>
        item.id == action.payload.id ? true : false
      );
      console.log(inCart);
      // data[0].quantity = action.payload.quantity;
      const a = inCart
      ? state.CartsItems.map((item) =>
    
          item.id === action.payload.id
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
      
     
    // console.log(data[0].quantity);

    case "REMOVE_CART_ITEM":
      
    return{
      ...state,CartsItems:state.CartsItems.filter(item=> item.id !== action.payload.id)
    }

    default:
      return state;
  }
}
