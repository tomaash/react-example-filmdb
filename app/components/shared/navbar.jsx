'use strict';

import React from 'react';
import {Link} from 'react-router';
import {NavItemLink} from 'react-router-bootstrap';

// import imageResolver from 'utils/image-resolver';

export default React.createClass({
  displayName: 'Navbar',
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
          <Link to='app' className="navbar-brand">
              <span className="glyphicon glyphicon-home"></span>
               FilmDB
          </Link>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <NavItemLink to='directors'>Directors</NavItemLink>
            </li>
            <li>
              <NavItemLink to='films'>Films</NavItemLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});
