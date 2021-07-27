import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view" />;

  return (
    <Col md={4} key={m._id}>
      <MovieCard movie={m} />
    </Col>
  );
}

export default MoviesList