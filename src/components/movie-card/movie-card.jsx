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
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title className="card-title">{movie.Title}</Card.Title>
          <Card.Text className="card-desc">{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Show Details</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};