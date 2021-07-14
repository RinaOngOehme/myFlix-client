import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    //props.onLoggedIn(username);
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Form>
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
            <Form.Label>Birthday:YYYY-MM-DD</Form.Label>
            <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Col>
    </Row>
  );
}