

const initialState = {
    loading:true,
    error:'',
    OrderHistory:{}
}

export function ohistory(state=initialState,action){
 
    switch (action.type) {
         
        case 'FETCH_HISTORY':
            return{
                    ...state,loading:true,
            }
           
        case 'FETCH_HISTORY_SUCCESS':
            return{
                ...state,loading:false,OrderHistory:action.payload  
            }
        case 'FETCH_HISTORY_FAIL':
            return{
                ...state,loading:false,error:action.payload
            }
        default:
            return state
          
    }
}