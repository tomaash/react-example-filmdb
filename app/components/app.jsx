'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

import Navbar from 'components/shared/navbar';
import Footer from 'components/shared/footer';

export default class App extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.flux.router = this.context.router;
  }
  render() {
    var navbar;
    if (this.context.router.getCurrentPathname() !== '/loginfoo') {
      navbar = <Navbar {...this.props}/>;
    }
    return (
      <div className="container-fluid">
        {navbar}
        <RouteHandler {...this.props}/>
        <Footer />
      </div>
    );
  }
}
