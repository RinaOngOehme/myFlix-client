import React from 'react';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  addMovie(e, movie) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user");
    axios.put(`https://myflixdb9278.herokuapp.com/users/${name}` + '/movies/' + movie.Title,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been added to your list of favorite movies!");
        window.location.pathname = `/users/${name}`
      })
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div >
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          <Link to={`../genre/${movie.Genre.Name}`}>
            <Button variant="link"><span className="bg-info btn btn-outline-light">Genre Details</span></Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`../director/${movie.Director.Name}`}>
            <Button variant="link"><span className="bg-info btn btn-outline-light">Director Details</span></Button>
          </Link>
        </div>

        <Button size='sm' className='add-favorite' variant='warning' onClick={(e) => this.addMovie(e, movie._id)}>
          Add Movie to Favorites
        </Button>

        <button className="back-bt" onClick={() => { onBackClick(null); }}>Back</button>
      </div>

    );
  }
}