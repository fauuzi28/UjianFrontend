import React,{useState} from "react";
import {MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import {LoginUser,errormessageclear} from './../redux/actions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Login = (props) => {

  const [data,setdata]=useState({
    username:'',
    password:''
  })
  console.log(props.username)

  const dataOnChange=(e)=>{
    console.log(e.target)
    setdata({...data,[e.target.name]:e.target.value})
  }


  const onFormSubmit=(e)=>{
    e.preventDefault()
    console.log('berhasil yes')
    props.LoginUser(data)
  }

if(props.isLogin){
  return <Redirect to='/'/>
}
  return (
    <div className="d-flex justify-content-center align-items-center" style={{border:"1px solid black",height:"90vh"}}>
        <form style={{width:'30%'}} onSubmit={onFormSubmit}>
          <p className="h3 text-center mb-4">Sign in</p>
          <div className="grey-text">
            <MDBInput label="Type your username" name='username' onChange={dataOnChange} icon="user" group type="text" validate value={data.username}/>
            <MDBInput label="Type your password" name='password' onChange={dataOnChange} icon="lock" group type="password" validate value={data.password}/>
          </div>
          {
            props.errormes?
            <MDBAlert color='danger' >
              {props.errormes} <span className='float-right hovererr font-weight-bolder' onClick={()=>props.errormessageclear()}>X</span>
            </MDBAlert>
            :
            null
          }
          <div className="text-center">
            <MDBBtn type='submit' disabled={props.loading}>Login</MDBBtn>
          </div>
        </form>
    </div>
);
};

const MapstatetoProps=(state)=>{
  return state.Auth
}

export default connect (MapstatetoProps, {LoginUser,errormessageclear })(Login);