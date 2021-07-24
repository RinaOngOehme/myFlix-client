
import React from 'react';
import PropTypes from 'prop-types';

// import from react bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// import from movie card styling
import './movie-card.scss';

// import link from react router dom
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="card-style">
        <Card.Img className="image" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title className="card-title">{movie.Title}</Card.Title>
          <Card.Text className="card-desc">{movie.Description}</Card.Text>
          <Card.Text className="card-genre">{movie.Genre.Name}</Card.Text>
          <Card.Text className="card-director">{movie.Director.Name}</Card.Text>
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="link"><span className="bg-secondary btn btn-outline-light">Show Details</span></Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.string.isRequired
    }),
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,

};