'use strict';

import Iso from 'iso';
import React from 'react';
import router from 'router';

// Paths are relative to `app` directory

import alt from 'utils/alt';

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

  if (process.env.BROWSER) {
    var chromeDebug = require('alt/utils/chromeDebug');
    chromeDebug(alt);
  }

  // bootstrap application with data from server
  const boot = await boostrap();
  alt.bootstrap(boot.initialState);

  router.run(
    (Handler) => {
      const app = React.createElement(Handler);
      React.render(app, boot.container);
    });

})();
