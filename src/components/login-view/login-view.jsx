import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';
import logo from '../../../public/myFlix-logo.svg';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginForm, setLoginform] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
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
              <Button className="font-weight-bold" variant="warning" size="lg" type="submit" onClick={toggleForm}>Register to become a member</Button>
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