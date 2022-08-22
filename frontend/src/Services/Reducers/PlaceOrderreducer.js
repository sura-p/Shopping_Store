const initialstate = {

    loading:false,
    error:''

}

export const request =(state=initialstate,action)=>{
    switch (action.type) {
        case 'CREATE_REQUEST':
            return{ ...state,loading:true

            }

        case 'CREATE_SUCCESS':
            return{
                ...state,loading:false
            }

        case 'CREATE_FAIL':
            return{
                ...state,loading:false
            }
            
            
    
        default:
           return state;
    }
}