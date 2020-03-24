const INITIAL_STATE={
    ishome:true
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'BUKANHOME':
            return{...state,ishome:false}
        case 'INIHOME':
            return{...state,ishome:true}
        default:
            return state 
    }
}