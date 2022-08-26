const initialState = {

    loadingPay:false,
    sucessPay:false,
   

}

export function payreq(state=initialState,action){
  
    switch (action.type) {
       
        case 'PAY_REQUEST':
            return{ ...state,loadingPay:true

            }

        case 'PAY_SUCCESS':
            return{
                ...state,loadingPay:false, sucessPay:true
            }

        case 'PAY_FAIL':
            return{
                ...state,loadingPay:false 
            }
        case 'PAY_RESET':
            return{
                ...state,loadingPay:false,sucessPay:false
            }
            
            
    
        default:
           return state;
    }
}