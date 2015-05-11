'use strict';

import React from 'react';
import {Link} from 'react-router';

// import imageResolver from 'utils/image-resolver';

export default React.createClass({
  displayName: 'Header',
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
          <Link to='app' className="navbar-brand">
              <span className="glyphicon glyphicon-home"></span>
              &nbsp;FilmDB
          </Link>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Link to='users'>Users</Link>
            </li>
            <li>
              <Link to='cars'>Cars</Link>
            </li>
            <li>
              <Link to='films'>Films</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});
