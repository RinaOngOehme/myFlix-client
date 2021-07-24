import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Director's Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-birthyear">
          <span className="label">Birthyear: </span>
          <span className="value">{director.Birthyear}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <Button variant="secondary" size="md" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};