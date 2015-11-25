'use strict';

// disable `no-unused-vars` rule
/* eslint no-unused-vars: 0 */
import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('./components/app')}>
    <DefaultRoute
      name='directors'
      handler={require('./components/directors/directors-table')} />
    <Route
      name='login'
      handler={require('./components/login')} />
    <Route
      name='films'
      handler={require('./components/films')} />
    <Route
      name='director'
      path='director/:id'
      handler={require('./components/director-profile')} />
    <Route
      name='film'
      path='film/:id'
      handler={require('./components/film-profile')} />
    <NotFoundRoute handler={require('./pages/not-found')} />
  </Route>
);

