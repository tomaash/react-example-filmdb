'use strict';

import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

// Paths are relative to `app` directory
// import alt from 'utils/alt';

import alt from 'utils/alt';
// import intlLoader from 'utils/intl-loader';

if (process.env.NODE_ENV === 'development') {
  require('debug').enable('dev, koa');
}

const boostrap = () => {
  return new Promise((resolve) => {
    Iso.bootstrap((initialState, __, container) => {
      resolve({initialState, __, container});
    });
  });
};

(async () => {
  // Init alt instance
  // const flux = new Flux();

  if (process.env.BROWSER) {
    var chromeDebug = require('alt/utils/chromeDebug');
    chromeDebug(alt);
  }

  // bootstrap application with data from server

  // const boot = await boostrap();
  // alt.bootstrap(boot.initialState);

  // load the intl-polyfill if needed
  // load the correct data/{lang}.json into app
  // const locale = flux.getStore('locale').getLocale();
  // const {messages} = await intlLoader(locale);
  // flux.getActions('locale').switchLocaleSuccess({locale, messages});

  // load routes after int-polyfill
  // routes.jsx imports components using the `window.Intl`
  // it should be defined before
  const routes = require('routes');

  // Render the app at correct URL
  Router.run(
    routes,
    Router.HistoryLocation,
    (Handler) => {
      // , {flux}
      const app = React.createElement(Handler);
      // React.render(app, boot.container);
      React.render(app, document.getElementById('content'));
    }
  );
})();
