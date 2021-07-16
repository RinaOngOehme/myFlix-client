import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';




import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div className="login-layout">
      <h3 className="text-center border border-dark shadow p-3 mb-5 bg-white rounded">myFlix movies!</h3>
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
          <Button className="font-weight-bold" variant="warning" size="lg" type="submit" onClick={handleSubmit}>Register to become member</Button>
        </div>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
};