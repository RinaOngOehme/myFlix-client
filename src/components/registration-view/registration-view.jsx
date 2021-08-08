import React, { useState } from 'react';
import axios from 'axios';
// import from react bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { connect } from 'react-redux';

//import PropTypes from 'prop-types';

// import logo
import logo from 'url:../../../public/myFlix-logo.svg';

// import registration view styling
import './registration-view.scss';

// import link from react router dom
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')
  //the following consts are to set states for form validation
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    axios.post('https://myflixdb9278.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert("You Are Registered!");
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};

    let isValid = true;

    if (username.trim().length < 6) {
      usernameErr.Username = "Username needs to be more than 6 characters.";
      isValid = false;
    }

    if (!username.match(/^[0-9a-zA-Z]+$/)) {
      usernameErr.Username = "Username must only include alphanumeric symbols.";
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.Password = "Password is required.";
      isValid = false;
    }

    if (email.trim().length === 0) {
      emailErr.Email = "Email is required.";
      isValid = false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      emailErr.Email = "Email is not valid.";
      isValid = false;
    }



    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  }

  return (
    <div className="registration-layout">
      <img className="myFlix-logo" src={logo} alt="logo" />
      <Form className="registration-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        {Object.keys(usernameErr).map((key) => {
          return <div key={key} style={{ color: "red" }}>{usernameErr[key]}</div>
        })}
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        {Object.keys(passwordErr).map((key) => {
          return <div key={key} style={{ color: "red" }}>{passwordErr[key]}</div>
        })}

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        {Object.keys(emailErr).map((key) => {
          return <div key={key} style={{ color: "red" }}>{emailErr[key]}</div>
        })}

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <div className="register-bt">
          <Button className="font-weight-bold" variant="warning" type="submit" onClick={handleSubmit}>Register Now!</Button>
        </div>
        <div className="back-bt">
          <Link to={`/`}>
            <Button className="font-weight-bold" variant="secondary" type="submit" >Back to Login</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password, email, birthday) => dispatch(handleSubmit(username, password, email, birthday))
});

export default connect(null, mapDispatchToProps)(RegistrationView);