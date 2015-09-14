'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

import Navbar from 'components/shared/navbar';
import Footer from 'components/shared/footer';
import Router from 'react-router';
import reactMixin from 'react-mixin';
import LoginActions from 'actions/login-actions';

@reactMixin.decorate(Router.State)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    LoginActions.loadLocalUser();
  }
  render() {
    var navbar;
    if (this.getPathname() !== '/login') {
      navbar = <Navbar />;
    }
    return (
      <div className="container-fluid">
        {navbar}
        <RouteHandler />
        <Footer />
      </div>
    );
  }
}
