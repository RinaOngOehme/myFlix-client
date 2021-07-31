import React from 'react';

// import from react bootstrap

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';

import PropTypes from 'prop-types';

import axios from 'axios'

import { Link } from 'react-router-dom';

// import profile view styling
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      /* user: {
       Username: null,
       Password: null,
       Email: null,
       Birthday: null,
       FavoriteMovies: [],
       movies: [],
       }
   } */
      usernameErr: "",
      passwordErr: "",
      emailErr: "",
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    // this.getUserInfo(token);
    console.log(this.props);
  }

  //getUserInfo(token) {
  //const name = localStorage.getItem('user')
  //axios.get(`https://myflixdb9278.herokuapp.com/users/${name}`, {
  //headers: { Authorization: `Bearer ${token}` }
  //})
  //.then(response => {
  //assign the result to the state
  //console.log(response)
  //this.setState({
  //Username: response.data.Username,
  //Password: response.data.Password,
  //Email: response.data.Email,
  //Birthday: response.data.Birthday,
  //FavoriteMovies: response.data.FavoriteMovies,
  //});
  //})
  //.catch(function (error) {
  //console.log(error);
  //});
  //}

  removeMovie(e, movie) {
    e.preventDefault();
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

  handleDelete(e) {
    e.preventDefault();
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
    e.preventDefault();
    const name = localStorage.getItem('user')
    const token = localStorage.getItem("token");
    axios.put(`https://myflixdb9278.herokuapp.com/users/${name}`,
      {
        Username: this.state.username,
        Password: this.state.password,
        Email: this.state.email,
        Birthday: this.state.birthday
      },

      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.username);
        console.log(data);
        alert(user + " has been updated");
        window.location.pathname = `/users/${data.username}`;
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
  }
  formValidation() {
    let usernameErr = {};
    let passwordErr = {};
    let emailErr = {};

    let isValid = true;

    if (this.state.username.trim().length < 5) {
      usernameErr.usernameShort = "Username needs to be more than 5 characters.";
      isValid = false;
    }

    if (!this.state.username.match(/^[0-9a-zA-Z]+$/)) {
      usernameErr.usernameNotAlphanumeric = "Username must only include alphanumeric symbols.";
      isValid = false;
    }

    if (this.state.password.trim().length === 0) {
      passwordErr.noPassword = "Password is required.";
      isValid = false;
    }

    if (this.state.email.trim().length === 0) {
      emailErr.noEmail = "Email is required.";
      isValid = false;
    }

    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      emailErr.noAtSymbol = "Email is not valid.";
      isValid = false;
    }

    this.setState({
      usernameErr: usernameErr,
      passwordErr, passwordErr,
      emailErr: emailErr,
    })
    return isValid;
  }


  render() {
    const { movies, user } = this.props;
    const { Username, Password, Email, Birthday, FavoriteMovies } = user;
    //const { UsernameError, EmailError, PasswordError, BirthdayError } = user;
    const { usernameErr, passwordErr, emailErr } = this.state;
    return (
      <Container className='profile-view'>
        <Tabs defaultActiveKey='profile' transition={false} className='profile-tabs'>

          <Tab className='tab-item' eventKey='profile' title='User Profile'>
            <Card style={{ width: '60rem' }}>
              <Card.Body>
                <Card.Title>Your Profile</Card.Title>
                <Card.Text className="profile-value">Username: {Username}</Card.Text>
                <Card.Text className="profile-value">Encrypted Password: {Password}</Card.Text>
                <Card.Text className="profile-value">Email: {Email}</Card.Text>
                <Card.Text className="profile-value">Birthday: {Birthday}</Card.Text>
                <Button className="font-weight-bold" variant="danger"
                  onClick={() => this.handleDelete()}>Delete Account</Button>
              </Card.Body>
            </Card>
          </Tab>

          <Tab className='tab-item' eventKey='fave-movie' title='Favorite Movies'>
            <Card className='profile-favemovie' border='info'>
              <Card.Title className='profile-title'>Favorite Movies</Card.Title>
              {FavoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}
              <div className='favorites-container'>
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (FavoriteMovies.includes(movie.Title)) {
                      return (<div key={movie._id}>
                        <Card >
                          <Link to={`/movies/${movie.Title}`}>
                            <Card.Text className="card-movietext">{movie.Title}</Card.Text>
                          </Link>
                          <Card.Body className='movie-card-body'>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' onClick={(e) => this.removeMovie(e, movie._id)}>
                              Remove Favorite Movie
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                      );
                    }
                  })}
              </div>
            </Card>
          </Tab>

          <Tab className='tab-item' eventKey='update-profile' title='Update User Profile'>

            <Form className="update-form" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" defaultValue={Username} />
              </Form.Group>
              {Object.keys(usernameErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{usernameErr[key]}</div>
              })}
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" defaultValue={Password} />
              </Form.Group>
              {Object.keys(passwordErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{passwordErr[key]}</div>
              })}
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" defaultValue={Email} />
              </Form.Group>
              {Object.keys(emailErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{emailErr[key]}</div>
              })}
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" defaultValue={Birthday} />

              </Form.Group>

              <div className="update-bt">
                <Button className="font-weight-bold" variant="warning" type="submit" >Update Change</Button>
              </div>
            </Form>


          </Tab>

        </Tabs>

        <div className="back-bt">
          <Link to={`/`}>
            <Button className="font-weight-bold" variant="info">Back to Movies</Button>
          </Link>
        </div>

      </Container>
    );
  }
}

//ProfileView.propTypes = {
  //users: PropTypes.shape({
    //Username: PropTypes.string.isRequired,
    //Email: PropTypes.string.isRequired,
    //Birthday: PropTypes.string,
    //FavoriteMovies: PropTypes.array,

  //})
//};


