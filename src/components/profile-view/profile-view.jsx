import React, { useState } from 'react';

// import from react bootstrap

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PropTypes from 'prop-types';

import axios from 'axios'

import { Link } from 'react-router-dom';

// import profile view styling
import './profile-view.scss';


export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    }
  }



  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUsers(accessToken);
  }
}

getUsers(token) {
  axios.get('https://myflixdb9278.herokuapp.com/users', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(response => {
      //assign the result to the state
      this.setState({
        users: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')

  const handleChange = () => {
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };


  render() {
    const { movies, user } = this.props;
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;

    return (
      <div className="profile-view">
        <div className="profile-username">
          <span className="label">Username: </span>
          <span className="value">{users.username}</span>
        </div>
        <div className="profile-password">
          <span className="label">Password: </span>
          <span className="value">{users.password}</span>
        </div>
        <div className="profile-email">
          <span className="label">Email: </span>
          <span className="value">{users.email}</span>
        </div>

        <div className="profile-birthday">
          <span className="label">Birthday: </span>
          <span className="value">{users.birthday}</span>
        </div>
        );
  }


        <Form className="update-form">
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
          <div className="update-bt">
            <Button className="font-weight-bold" variant="warning" type="submit" onClick={handleChange}>Update Change</Button>
          </div>
          <div className="back-bt">
            <Button className="font-weight-bold" variant="secondary" type="submit" onClick={handleSubmit}>Back to Login</Button>
          </div>
        </Form>