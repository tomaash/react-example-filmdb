'use strict';

import path from 'path';
import debug from 'debug';

import koa from 'koa';
import hbs from 'koa-hbs';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import staticCache from 'koa-static-cache';
import responseTime from 'koa-response-time';
import bodyParser from 'koa-body-parser';

import router from './router';
import config from './config/init';

import rest from './rest';
import {clone} from 'lodash';

const app = koa();
const env = process.env.NODE_ENV || 'development';

// add header `X-Response-Time`
app.use(responseTime());
app.use(logger());

// various security headers
app.use(helmet.defaults());

if (env === 'production') {
  app.use(require('koa-conditional-get')());
  app.use(require('koa-etag')());
  app.use(require('koa-compressor')());

  // Cache pages
  const cache = require('lru-cache')({maxAge: 3000});
  app.use(require('koa-cash')({
    get: function* (key) {
      return cache.get(key);
    },
    set: function* (key, value) {
      cache.set(key, value);
    }
  }));
}

if (env === 'development') {
  // set debug env, must be programmaticaly for windows
  debug.enable('dev,koa');
  // log when process is blocked
  require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`));
}

app.use(favicon(path.join(__dirname, '../app/images/favicon.ico')));
app.use(hbs.middleware({
  defaultLayout: 'index',
  layoutsPath: path.join(__dirname, '/views/layouts'),
  viewPath: path.join(__dirname, '/views')
}));

const cacheOpts: Object = {maxAge: 86400000, gzip: true};

// Proxy asset folder to webpack development server in development mode
if (env === 'development') {
  var webpackConfig: Object = require('./../webpack/dev.config');
  app.use(mount('/assets', require('koa-proxy')({ host: `http://localhost:${webpackConfig.server.port}` })));
}
else {
  app.use(mount('/assets', staticCache(path.join(__dirname, '../dist'), cacheOpts)));
}

// Parse body
app.use(bodyParser());

import User from './models/user';
// Authenticate
app.use(function *(next) {
  const token = this.req.headers['auth-token'];
  const isApi = !!this.request.url.match(/^\/api/);
  const user = token && (yield User.findOne({token}));
  if (isApi && !user) {
    this.status = 401;
    this.body = '401 Unauthorized';
    return;
  }
  this.request.user = user;
  if (user) {
    // Add user to get condition for API
    if (this.request.method === 'GET') {
      var conditions;
      var query = clone(this.request.query);
      try {
        conditions = (query.conditions && JSON.parse(query.conditions)) || {};
      } catch (err) {
        console.error(err);
        conditions = {};
      }
      conditions.user = user._id;
      query.conditions = JSON.stringify(conditions);
      this.request.query = query;
      console.log('has query');
      console.log(this.request.query);
    }
    // Add user to post data for API
    else if (this.request.body) {
      console.log('has body');
      this.request.body.user = user._id;
      console.log(this.request.body);
    }
  }
  yield next;
});

// Connect REST API
rest(app);

app.use(router);
var port = process.env.PORT || config.port || 3000;
app.listen(port);

console.log(`Application started on port ${config.port}`);
if (process.send) {
  process.send('online');
}
