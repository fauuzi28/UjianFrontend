import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBNav,
  MDBLink,
  MDBIcon,
  MDBCol
} from "mdbreact";
import { connect } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { BukanHome, IniHome, countCart } from "./../redux/actions";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

class NavbarPage extends Component {
  state = {
    isOpen: false,
    keyword: ""
  };


  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onLogoutClick = () => {
    localStorage.clear("iduser");
  };

  onChangeSearch = e => {
    this.setState({ keyword: e.target.value });
  };

  BtnSubmitSearch = () => {
    this.refs.keyword.value = "";
  };

  render() {
    return (
      <MDBNavbar
        color="peach-gradient color-block-5 mb-3 mx-auto z-depth-1"
        transparent={this.props.Header}
        scrolling
        dark
        fixed="top"
        expand="md"
      >
        <MDBNavbarBrand href="/">
          <strong className="white-text">Minimales</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav tag="div" right className="mr-5">
            <MDBNavItem>
              {this.props.User.role === "admin" ? (
                <MDBNavLink to="/manageadmin">Manage Admin</MDBNavLink>
              ) : null}
            </MDBNavItem>
            
              <MDBNavItem>
                {this.props.User.role === "user" ? (
                <MDBNavLink to="/cart">
                  <FiShoppingCart style={{ fontSize: 20 }} />
                  Cart {this.props.User.cart}
                </MDBNavLink>
                ) : null}
              </MDBNavItem>
            
            {this.props.User.role === "admin" ? (
              <MDBNavItem>
                <MDBNavLink to="/checkout">
                  <FiShoppingCart style={{ fontSize: 20 }} />
                  Checkout
                </MDBNavLink>
              </MDBNavItem>
            ) : null}
            <MDBNavItem>
              {this.props.User.role === "admin" ||
              this.props.User.role === "user" ? null : (
                <MDBNavLink to="/register">Register</MDBNavLink>
              )}
            </MDBNavItem>
            <MDBNavItem>
              {this.props.User.isLogin ? null : (
                <MDBNavLink to="/login">Login</MDBNavLink>
              )}
            </MDBNavItem>
            <MDBNavItem>
              {this.props.User.username ? (
                <MDBDropdown className>
                  <MDBDropdownToggle nav className="warnanav">
                    <FaUserCircle /> hallo, {this.props.User.username}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href="/usersetting">
                      User Setting
                    </MDBDropdownItem>
                    <MDBDropdownItem onClick={this.onLogoutClick} href="/">
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              ) : null}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const MapstatetoProps = state => {
  return {
    User: state.Auth,
    Header: state.Header.ishome
  };
};

export default connect(MapstatetoProps, { IniHome, BukanHome, countCart })(NavbarPage);
