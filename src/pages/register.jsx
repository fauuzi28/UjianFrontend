import React, { useState } from "react";
import { connect } from "react-redux";
import { RegisterUser, errormessageclear } from "./../redux/actions";
import { Redirect } from "react-router-dom";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { MDBAlert } from 'mdbreact';

const Register = props => {
    const [data,setdata]=useState({
        username: "",
        password: "",
        passcon: "",
        email: ""
    })
    console.log(props.username)

    const dataOnChange = e => {
        console.log(e.target);
        setdata({ ...data, [e.target.name]: e.target.value });
      };
    
    const onFormSubmit = e => {
        e.preventDefault();
        console.log("berhasil yes");
        props.RegisterUser(data);
      };
    
      if (props.isRegis) {
        return <Redirect to="/" />;
      }
      return(
        <Form className='mt-5 pt-5' onSubmit={onFormSubmit}>
      <Row form>
        <Col md={6}>
          <FormGroup> 
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email"  onChange={dataOnChange} id="Email" value={data.email} placeholder="Masukan Email" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Username</Label>
            <Input type="text" name="username" onChange={dataOnChange} id="username" value={data.username} placeholder="Masukan Username" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Password</Label>
        <Input type="password" name="password" onChange={dataOnChange} id="password" value={data.password} placeholder="Password"/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress2">Confirm Password</Label>
        <Input type="password" name="passcon" onChange={dataOnChange} id="passcon" value={data.passcon} placeholder="Confirm Password"/>
      </FormGroup>
      {props.errormes ? (
          <MDBAlert color="danger">
            {props.errormes}{" "}
            <span
              className="float-right hovererr font-weight-bolder"
              onClick={() => props.errormessageclear()}
            >
              X
            </span>
          </MDBAlert>
        ) : null}
      <Button type="submit" disabled={props.loading}>Register</Button>
      {props.loading ? (
        <div class="alert alert-success" role="alert">
        Anda berhasil Register, <a href="/" class="alert-link">Silahkan Login</a>.
      </div>
      ): null }
    </Form>
      )
}




const MapstatetoProps = state => {
    return state.Auth;
  };

export default connect(MapstatetoProps, { RegisterUser, errormessageclear})(
    Register
  );