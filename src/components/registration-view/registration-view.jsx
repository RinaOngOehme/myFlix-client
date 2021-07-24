import React, { useState } from 'react';

// import from react bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PropTypes from 'prop-types';

// import logo
import logo from 'url:../../../public/myFlix-logo.svg';

// import registration view styling
import './registration-view.scss';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };

  return (
    <Form className="registration-form">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} /></Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday (YYYY-MM-DD):</Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <div className="register-bt">
        <Button className="font-weight-bold" variant="warning" type="submit" onClick={handleSubmit}>Register Now!</Button>
      </div>
      <div className="back-bt">
        <Button className="font-weight-bold" variant="secondary" type="submit" onClick={handleSubmit}>Back to Login</Button>
      </div>
    </Form>

  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.date
  }),
  onRegister: PropTypes.func,
}