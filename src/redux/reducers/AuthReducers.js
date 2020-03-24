import {
    USER_LOGIN_FAILED,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAILED,
    USER_REGISTER_START,
    USER_REGISTER_SUCCESS,
    USER_SEARCH_ITEM
} from './../actions/type'

const INITIAL_STATE={
    username:'',
    id:0,
    loading:false,
    isLogin:false,
    isRegis:false,
    errormes:'',
    role:'',
    cart:0,
    searchname:''
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOGIN_START:
            return {...state,loading:true}
        case USER_LOGIN_SUCCESS:
            return {...state,loading:false,...action.payload,isLogin:true}
        case USER_LOGIN_FAILED:
            return {...state,loading:false,errormes:action.payload}
        case USER_REGISTER_START:
            return {...state,loading:true}
        case USER_REGISTER_SUCCESS:
            return {...state,loading:false,...action.payload,isRegis:true}
        case USER_REGISTER_FAILED:
            return {...state,loading:false,errormes:action.payload}
        case USER_SEARCH_ITEM:
            return {...state,searchname:action.payload}
        case "COUNT_CART" :
            return{...state, loading:false,cart:+action.payload}
        case 'ErrorClear':
            return INITIAL_STATE
        default:
            return state
    }
}