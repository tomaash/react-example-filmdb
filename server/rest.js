import generateApi from 'koa-mongo-rest';
import koaRouter from 'koa-router';
import Car from './models/car';
import Director from './models/director';
import Film from './models/film';
import User from './models/user';
import parse from 'co-body';
import bcrypt from 'bcrypt';
import uuid from 'node-uuid';

export default function(app) {
  const mongoUrl = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || '127.0.0.1:27017/isofilmdb';
  const mongoose = require('mongoose');
  mongoose.connect(mongoUrl);

  app.use(koaRouter(app));

  app.post('/auth/register', function *(next) {
    yield next;
    const SALT_WORK_FACTOR = 10;
    const error = {message: 'Username already exists'};
    try {
      const body = yield parse(this, {
        limit: '1kb'
      });
      const salt = yield bcrypt.genSalt.bind(this, SALT_WORK_FACTOR);
      const hash = yield bcrypt.hash.bind(this, body.password, salt);
      body.password = hash;
      body.token = uuid.v1();
      const result = yield User.create(body);
      this.status = 201;
      this.body = result;
    } catch (err) {
      this.status = 409;
      this.body = error;
    }
  });

  app.post('/auth/login', function *(next) {
    yield next;
    try {
      const error = {message: 'Username and password doesn\'t match'};
      const body = yield parse(this, {
        limit: '1kb'
      });
      const user = yield User.findOne({
        username: body.username
      });
      if (!user) throw error;
      const match = yield bcrypt.compare.bind(this, body.password, user.password);
      if (!match) throw error;
      user.token = uuid.v1();
      this.status = 201;
      this.body = yield user.save();
    } catch (err) {
      this.status = 409;
      this.body = err;
    }
  });

  generateApi(app, Car, '/api');
  generateApi(app, Film, '/api');
  generateApi(app, Director, '/api');
  // generateApi(app, User, '/api');
}

