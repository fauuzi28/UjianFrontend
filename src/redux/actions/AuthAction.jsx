import Axios from 'axios'
import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from './type'
import { API_URL } from '../../supports/ApiUrl'


export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
            if(username===''||password===''){
            dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terisi'})
          }else{
            Axios.get(`${API_URL}/users`,{
              params:{
                username:username,
                password:password
              },
      
            })
            .then((res)=>{
              if(res.data.length){
                localStorage.setItem('iduser',res.data[0].id)
                dispatch({type:USER_LOGIN_SUCCESS,payload:res.data[0]})
              }else{
                dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar bor'})
              }
            }).catch((err)=>{
              dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
          }
        }
    }

export const errormessageclear=()=>{
    return {
        type:'ErrorClear'
    }
}

export const KeepLogin=(data)=>{
  return{
    type:'USER_LOGIN_SUCCESS',
    payload:data
  }
}