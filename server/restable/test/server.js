var koa = require('koa');
var router = require('koa-router');
var mongoose = require('mongoose');
var generateApi = require('../lib/index');

var app = koa();
app.use(router(app));

var mongoUrl = '127.0.0.1:27017';
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
  name: String,
  age : Number,
  _id : Number
}, {versionKey: false});

model = app.model = mongoose.model('user', schema);
generateApi(app, model);

module.exports = app;
