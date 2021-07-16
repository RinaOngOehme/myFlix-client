import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className="card-style">
        <Card.Img className="image" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title className="card-title">{movie.Title}</Card.Title>
          <Card.Text className="card-desc">{movie.Description}</Card.Text>
          <Card.Text className="card-genre">{movie.Genre}</Card.Text>
          <Card.Text className="card-director">{movie.Director}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link"><span className="bg-secondary btn btn-outline-light">Show Details</span></Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};