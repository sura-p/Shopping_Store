// import { SHOW_MOVIES, WATCH_LATER } from "../constants";

const initialState= {
    products: [],
    loading: true,
    error: '',
    CartsItems:[]
    
    
}

export function FETCH(state=initialState,action){
    switch(action.type){
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
          case 'FETCH_SUCESS':
            return { ...state, products: action.payload, loading: false };
          case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
          case 'CART_ADD_ITEMS':
              const cart = state.products.filter((ele)=>{
                  return ele.id === action.payload.id;
              })
            return {...state,CartsItems:[...state.CartsItems,cart]};
                break;
            case 'REMOVE_CART_ITEM':
                const cartItems = state.CartsItems.filter((item)=> item[0].id !== action.payload.id);
                return {...state,CartsItems:[cartItems]}
                break;
          default:
            return state;
    }
}

