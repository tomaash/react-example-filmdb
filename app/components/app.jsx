'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

import Navbar from 'components/shared/navbar';
import Footer from 'components/shared/footer';

export default class App extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid">
        <Navbar {...this.props}/>
        <RouteHandler {...this.props}/>
        <Footer />
      </div>
    );
  }
}
