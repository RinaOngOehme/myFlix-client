import React from 'react';

// import from react bootstrap

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

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
        movies: [],
        UsernameError: "",
        EmailError: "",
        PasswordError: "",
        BirthdayError: "",
      }
    }
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
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


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


  render() {
    const { movies } = this.props;
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
            <Card className='profile-card' border='info'>
              <Card.Title className='profile-title'>Favorite Movies</Card.Title>
              {FavoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}
              <div className='favorites-container'>
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                      return (
                        <div key={movie._id}>
                          <Card style={{ width: '16rem', float: 'left' }}>
                            <Link to={`/movies/${movie._id}`}>
                              <Card.Img className='favorites-movie' variant="top" src={movie.ImageURL} />
                            </Link>
                            <Card.Body className='movie-card-body'>
                              <Button size='sm' className='profile-button remove-favorite' variant='danger' onClick={(e) => this.removeFavorite(e, movie._id)}>
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
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array,

  })
};


