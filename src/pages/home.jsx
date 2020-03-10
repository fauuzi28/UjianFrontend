import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


class Home extends Component {
    state = {  }
    render() { 
        if(this.props.isLogin){
            return (  
                <div>
                    <h1>
                        INI HOME BOR
                    </h1>
                </div>
            );
        }
        return(
            <Redirect to='/login'/>
        )
    }
}
 
const MapstatetoProps=({Auth})=>{
    return{ 
        isLogin:Auth.isLogin
    }
}

export default connect(MapstatetoProps) (Home);