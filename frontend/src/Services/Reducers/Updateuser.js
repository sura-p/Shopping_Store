const initialstate= {
    loadingUpdate:false
}

export function userupdate(state=initialstate,action){
switch (action.type) {
    case 'UPDATE_REQUEST':
        return{
            ...state,loadingUpdate:true
        }
    case 'UPDATE_SUCESS':
        return{
            ...state,loadingUpdate:false
        }
    case 'UPDATE_FAIL':
        return{
            ...state,loadingUpdate:false
        }        
        

    default:
        state;
}
}