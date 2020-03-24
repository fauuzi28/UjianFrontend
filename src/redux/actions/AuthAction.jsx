import Axios from "axios";
import {
  USER_LOGIN_START,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_START,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
} from "./type";
import { API_URL } from "../../supports/ApiUrl";

export const LoginUser = ({ username, password }) => {
  return dispatch => {
    dispatch({ type: USER_LOGIN_START });
    if (username === "" || password === "") {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: "username atau password tidak terisi"
      });
    } else {
      Axios.get(`${API_URL}/users`, {
        params: {
          username: username,
          password: password
        }
      })
        .then(res => {
          if (res.data.length) {
            localStorage.setItem("iduser", res.data[0].id);
            dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data[0] });
          } else {
            dispatch({
              type: USER_LOGIN_FAILED,
              payload: "username atau password tidak terdaftar bor"
            });
          }
        })
        .catch(err => {
          dispatch({ type: USER_LOGIN_FAILED, payload: err.message });
        });
    }
  };
};

export const RegisterUser = ({username, password, passcon, email}) => {
  return (dispatch)=>{
    var role="user"
    dispatch({type:USER_REGISTER_START})
    if( username===''||password===''||passcon===''||email===''){
      dispatch({type:USER_REGISTER_FAILED,payload:'Tidak bisa di kosongkan bor'})
    }else{
      Axios.get(`${API_URL}/users?username=${username}`)
      .then ((res1)=>{
        if(res1.data.length){
          dispatch({type:USER_REGISTER_FAILED,payload:'Username sudah ada bor'})
        }else if(password != passcon){
          dispatch({type:USER_REGISTER_FAILED,payload:'Password konfirmasi beda bor'})
        }else{
          Axios.post(`${API_URL}/users`,{username, password , email, role})
          .then((res2)=>{
            dispatch({type:USER_REGISTER_SUCCESS,payload:res2.data[0]})
          }).catch((err1)=>{
            console.log(err1)
          })
        }
      }).catch((err2)=>{
        console.log(err2)
      })
    }
  }
}

export const countCart=()=>{
  return (dispatch)=>{
      Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=2&status=oncart`)
      .then((res)=>{   
          var newarrforprod=[]
          res.data[0].transactiondetails.forEach(element =>{
              newarrforprod.push(Axios.get(`${API_URL}/products/${element.productId}`))
          })
          console.log(newarrforprod)
          Axios.all(newarrforprod)
          .then((res2)=>{
              console.log(res2)
              res2.forEach((val, index)=>{
                  res.data[0].transactiondetails[index].dataprod=val.data 
              })
              let total=0
              res.data[0].transactiondetails.forEach((val)=>{
                  total+=val.qty
              })
              dispatch({type:"COUNT_CART",payload: total})
          })
      }).catch((err)=>{
          console.log(err)
      })
  }
}

export const errormessageclear = () => {
  return {
    type: "ErrorClear"
  };
};

export const KeepLogin = data => {
  return {
    type: "USER_LOGIN_SUCCESS",
    payload: data
  };
};

export const LoginError=()=>{
  return(dispatch)=>{
      dispatch({type:'LOGIN_ERROR',payload:'Login_error'})
  }
}

export const LoginSucces=(datauser)=>{
  return{
      type:'LOGIN_SUCCESS',
      payload:datauser
  }
}

export const GantiPassword = (passwordbaru) => {
  return {
    type: "GANTI_PASSWORD",
    payload: passwordbaru
  };
};

export const CartAction=(e)=>{
  return {
    type: 'ADD_CART',
    payload: e
  }
}

