import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';
import logo from 'url:../../../public/myFlix-logo.svg';

import './login-view.scss';

// import link from react router dom
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginForm, setLoginform] = useState(true);

  //the following const are to set states for form validation
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    /* send a request to the server for authentication */
    axios.post('https://myflixdb9278.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert("User Not Found or Incorrect Password, Please Try Again!");
        console.log('no such user')
      });
  };

  const toggleForm = () => {
    setLoginform(!loginForm)
  }




  return (
    <div className="login-layout">
      <img className="myFlix-logo" src={logo} alt="logo" />
      {
        !loginForm ? <RegistrationView /> :
          <Form className="login-form">
            <Form.Group controlId="formUsername">
              <Form.Label className="font-weight-bold">Username:</Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="font-weight-bold">Password:</Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} /></Form.Group>

            <div className="login-bt">
              <Button className="font-weight-bold" variant="success" size="lg" type="submit" onClick={handleSubmit}>Members Login</Button>
            </div>
            <h5 className="log-Reg">OR</h5>
            <div className="register-bt">
              <Link to={`/register`}>
                <Button className="font-weight-bold" variant="warning" size="lg" type="submit" onClick={toggleForm}>Register to become a member</Button>
              </Link>
            </div>
          </Form>
      }
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
};