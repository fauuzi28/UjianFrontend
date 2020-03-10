import React, { useEffect, useState } from 'react';
import './App.css';
import Login from  './pages/Login'
import Header from './Component/Header'
import Home from './pages/home'
import {Route,Switch} from 'react-router-dom'
import Axios from 'axios';
import { API_URL } from './supports/ApiUrl';
import { KeepLogin } from './redux/actions';
import {connect} from 'react-redux'
import ManageAdmin from './pages/manageadmin'
import NotFound from './pages/notfound';

function App({KeepLogin}) {

  const[Loading,setLoading]=useState(false)

  useEffect(()=>{
    var id=localStorage.getItem('iduser')
    Axios.get(`${API_URL}/users/${id}`)
    .then(res=>{
      KeepLogin(res.data)
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  },[])
  if(Loading){
    return <div>loading....</div>
  }
  return (
    <div>
      <Header/>
      <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/manageadmin' exact component={ManageAdmin}/>
      <Route path='/*' component={NotFound}/>
      </Switch>
    </div>
  );
}

export default connect(null,{KeepLogin})(App);
