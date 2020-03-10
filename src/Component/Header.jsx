import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBNav, MDBLink
} from "mdbreact";
import {connect} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'



class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logoutOnClick=()=>{
  localStorage.clear()
}

render() {
  return (
    // <Router>
      <MDBNavbar color="amy-crisp-gradient color-block mx-auto" dark expand="md">
        <MDBNavbarBrand href='/'>
          <strong className="white-text">Minimales</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right className='mr-5'>
            <MDBNavItem>
              {
                this.props.User.role==='admin'?
                  <MDBNavLink to='/manageadmin'>
                  Manage Admin
                  </MDBNavLink>
                  :
                  null
              }
              {/* <MDBNavLink>
                
              </MDBNavLink> */}
            </MDBNavItem>
            <MDBNavItem>
            </MDBNavItem>
            <MDBNavItem>
              {
                this.props.User.username?
                <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <FaUserCircle/> {this.props.User.username}
                    </MDBDropdownToggle>
                  <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              :
              null
              }
            </MDBNavItem>
            <MDBNavItem>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    // </Router>
    );
  }
}

const MapstatetoProps=(state)=>{
  return {
    User:state.Auth
  }
}

export default connect(MapstatetoProps)(NavbarPage);