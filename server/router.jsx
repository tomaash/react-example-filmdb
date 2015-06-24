'use strict';

import fs from 'fs';
import path from 'path';
import debug from 'debug';

import Router from 'react-router';
import React from 'react';

// Paths are relative to `app` directory
import routes from 'routes';

import Iso from 'iso';
import alt from 'utils/alt';

export default function *() {
  const isCashed = this.cashed ? yield *this.cashed() : false;
  if (!isCashed) {

    var getHandler = function(routes, url) {
      return new Promise(function(resolve) {
        Router.run(routes, url, function (Handler) {
          resolve(Handler);
        });
      });
    };

    // We seed our stores with data
    alt.bootstrap(JSON.stringify({}));
    var iso = new Iso();

    // We use react-router to run the URL that is provided in routes.jsx
    const handler = yield getHandler(routes, this.request.url);
    const node = React.renderToString(React.createElement(handler));

    iso.add(node, alt.flush());
    var content = iso.render();
    let assets;
    if (process.env.NODE_ENV === 'development') {
      assets = fs.readFileSync(path.resolve(__dirname, './webpack-stats.json'));
      assets = JSON.parse(assets);
    }
    else {
      assets = require('./webpack-stats.json');
    }

    debug('dev')('return html content');
    yield this.render('main', {content, assets});
  }
}
