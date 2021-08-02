import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// import react bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';



import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MoviesList from '../movies-list/movies-list';
import { setMovies, setUsers } from '../../actions/actions';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

// import main view styling
import './main-view.scss';

// import views
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { Link } from "react-router-dom";

// import logo
import logo from 'url:../../../public/myFlix-logo.svg';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        //user: JSON.parse(localStorage.getItem('user'))
        //user: localStorage.getItem('user')
      });
      this.getUsers(accessToken);
      this.getMovies(accessToken);
    }
  }

  onRegister(register) {
    console.log(register);
    this.setState({
      register
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://myflixdb9278.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token) {
    const name = localStorage.getItem('user')
    axios.get(`https://myflixdb9278.herokuapp.com/users/${name}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //assign the result to the state
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    let { movies, visibilityFilter } = this.props;
    let { user } = this.state;
    const token = localStorage.getItem('token')
    console.log(this.state)

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Navbar fixed="top" bg="light">
            <Navbar.Brand className="nav-style">Welcome to myFlix Movies!</Navbar.Brand>
            <Link to={`/`}>
              <Button className="btn btn-light">Login</Button>
            </Link>
            <Link to={`/profile`}>
              <Button className="btn btn-light">Profile</Button>
            </Link>
            <Nav className="form-inline my-2 my-lg-0">
              <VisibilityFilterInput visibilityFilter={visibilityFilter} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </Nav>
            <Link to={`/`}>
              <Button className="btn btn-light" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Link>
          </Navbar>

          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            if (movies.length === 0) return
            <div className="main-view" />;
            return (<MoviesList movies={movies} />);
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />


          <Route path="/profile" render={() => {
            if (user)
              return <Col md={6}>
                <ProfileView movies={movies} user={user} />
              </Col>
          }} />


          <Route path="/movies/:title" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <MovieView movie={movies.find(m => m.Title === match.params.title)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genre/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/director/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Row>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  const { visibilityFilter } = state;
  return {
    movies: state.movies,
    visibilityFilter
  }
}


export default connect(mapStateToProps, { setMovies })(MainView);