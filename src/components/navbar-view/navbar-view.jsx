import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

export class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user, visibilityFilter } = this.props;


    if (!user) return null;

    return (
      <Navbar fixed="top" bg="light" className="justify-content-end">
        <Nav className="mr-auto p-2 text-dark bg-warning">Welcome to MyFlix Movies!</Nav>
        <Nav className="justify-content-end">
          <Link to={`/`}>
            <Button className="btn btn-light">Movies</Button>
          </Link>
        </Nav>
        <Nav className="form-inline my-2 my-lg-0">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </Nav>
        <Nav >
          <Link className="justify-content-end" to={`/profile`}>
            <Button className="btn btn-light">Profile</Button>
          </Link>
          <Link className="justify-content-end" to={`/`}>
            <Button className="btn btn-light pull-right" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Link>
        </Nav>
      </Navbar>

    );
  }
}
export default NavBar;