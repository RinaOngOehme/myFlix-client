import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://myflixdb9278.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onLoggedIn(user) {
    this.setState({
      user
    });
  }
  onRegister(register) {
    this.setState({
      register
    });
  }
  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div> className="main-view"</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? (
            <Row className="row-styles">
              <Col md={6}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
          : (
            <Row className="row-styles">
              {movies.map(movie => (
                <Col md={4}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              ))}
            </Row>
          )
        }
      </div>
    );
  }
}

export default MainView