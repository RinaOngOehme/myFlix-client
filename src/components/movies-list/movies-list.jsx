import React from "react";
import { connect } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) => m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Container>
      <Row className="main-cardContainer">
        {filteredMovies.map((m, index) => (
          <Col key={index} className="main-card" lg="3" md="4" sm="6" xs="10">
            <MovieCard key={m._id} movie={m} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps)(MoviesList);
