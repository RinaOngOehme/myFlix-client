import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>

    {filteredMovies.map(m => (
      <Col md={4} key={m.Title}>
        <MovieCard movie={m} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.array
}