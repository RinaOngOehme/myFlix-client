import React, { useState } from 'react';

// import from react bootstrap

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import PropTypes from 'prop-types';

import axios from 'axios'

import { Link } from 'react-router-dom';

// import profile view styling
import './profile-view.scss';


export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      user: {
        Username: "",
        Password: "",
        Email: "",
        Birthday: "",
        FavoriteMovies: [],
        UsernameError: "",
        EmailError: "",
        PasswordError: "",
        BirthdayError: "",
      }
    }
  }



  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUserInfo(accessToken);
    console.log(this.state)
  }


  getUserInfo(token) {
    const name = localStorage.getItem('user')
    axios.get(`https://myflixdb9278.herokuapp.com/users/${name}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //assign the result to the state
        console.log(response)
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addMovie(movie) {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user");
    axios.add(`https://myflixdb9278.herokuapp.com/users/${name}` + '/movies/' + movie.Title,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been added to your list of favorite movies!");
        window.location.pathname = `/users/${name}`
      })
  }

  removeMovie(movie) {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user");
    axios.delete(`https://myflixdb9278.herokuapp.com/users/${name}` + '/movies/' + movie.Title,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been removed from your list of favorite movies!");
        window.location.pathname = `/users/${name}`
      })
  }

  handleDelete() {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user");
    axios.delete(`https://myflixdb9278.herokuapp.com/users/${name}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert(user + "account has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  handleSubmit(e) {
    e.preventDefault()
    console.log(e.currentTarget.elements.formUsername.value)
    console.log(e.currentTarget.elements.formEmail.value)
  }



  formValidation() {
    let UsernameError = {};
    let EmailError = {};
    let PasswordError = {};
    let BirthdayError = {};
    let isValid = true;
    if (this.state.Username.trim().length < 5) {
      UsernameError.usernameTooShort = "Username must be Alphanumeric and contains more than 5 characters";
      isValid = false;
    }
    if (this.state.Password.trim().length < 5) {
      PasswordError.passwordTooShort = "Password must be minimum 6 characters) ";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    if (this.state.Birthday === '') {
      BirthdayError.birthdayEmpty = "Please enter your Birthday.";
      isValid = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError,
    })
    return isValid;
  };




  render() {
    const { movies, user } = this.state;
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state.user;
    const { UsernameError, EmailError, PasswordError, BirthdayError } = this.state.user;

    return (
      <div className="profile-view">

        <Form className="update-form" onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" defaultValue={Username} />
            {Object.keys(UsernameError).map((key) => {
              return (<div key={key} style={{ color: "red" }}>
                {UsernameError[key]}</div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" defaultValue={Password} />
            {Object.keys(PasswordError).map((key) => {
              return (<div key={key} style={{ color: "red" }}>
                {PasswordError[key]}</div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" defaultValue={Email} />
            {Object.keys(EmailError).map((key) => {
              return (<div key={key} style={{ color: "red" }}>
                {EmailError[key]}</div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" defaultValue={Birthday} />
            {Object.keys(BirthdayError).map((key) => {
              return (<div key={key} style={{ color: "red" }}>
                {BirthdayError[key]}</div>
              );
            })}
          </Form.Group>

          <Row>
            {FavoriteMovies.map((movie) => {
              return (
                <Col md={3} key={movie.Title}>
                  <div key={movie.Title}>
                    <Card>
                      <Card.Img className="card-img" variant="top" src={movies.ImageURL} />
                      <Card.Body>
                        <Link to={`/movies/${movies.Title}`}>
                          <Card.Title>{movies.Title}</Card.Title>
                        </Link>
                        <Button variant="success" onClick={() => this.addMovie(movie)}>Add Movie to Favorites</Button>
                        <Button variant="danger" onClick={() => this.removeMovie(movie)}>Remove Movie from Favorites</Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              )
            })}
          </Row>


          <div className="update-bt">
            <Button className="font-weight-bold" variant="warning" type="submit" >Update Change</Button>
          </div>
          <div className="back-bt">
            <Link to={`/`}>
              <Button className="font-weight-bold" variant="info">Back to Movies</Button>
            </Link>
          </div>
          <Button className="font-weight-bold" variant="danger"
            onClick={() => this.handleDelete()}>Delete Account</Button>
        </Form>

      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.date
  }).isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  })).isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}
