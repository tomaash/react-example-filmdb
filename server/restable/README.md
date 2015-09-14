# Koa mongo REST [![NPM version](https://badge.fury.io/js/koa-mongo-rest.svg)](http://badge.fury.io/js/koa-mongo-rest) [![Dependency Status](https://gemnasium.com/t3chnoboy/koa-mongo-rest.svg)](https://gemnasium.com/t3chnoboy/koa-mongo-rest) [![Build Status](https://travis-ci.org/t3chnoboy/koa-mongo-rest.svg?branch=master)](https://travis-ci.org/t3chnoboy/koa-mongo-rest)

Easy REST api for [koa](http://koajs.com) server  

[![NPM](https://nodei.co/npm/koa-mongo-rest.png?downloads=true)](https://nodei.co/npm/koa-mongo-rest/)



## Installation
Install using npm:
```sh
npm install koa-mongo-rest
```

## Usage

Require library
```javascript
generateApi = require('koa-mongo-rest');
```

Create mongoose model
```javascript
mongoUrl = '127.0.0.1:27017';
mongoose = require('mongoose');
mongoose.connect(mongoUrl);

schema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  zipcode: Number,
  lists: Array
});

model = mongoose.model('users', schema);
```

Create server
```javascript
var koa = require('koa');
var router = require('koa-router');

var app = koa();

//router is required
app.use(router(app));


//add REST routes to your app. Prefix is optional
generateApi(app, model, '/api');

app.listen(process.env.PORT || 5000);
```

Following REST API is now created for you:

| HTTP Verb     | /users   | /users/:id |
| ------------- | ------------- | --------------- |
| GET           | Get all documents, or documents that match the query. <br> You can use [mongoose find conditions] (http://mongoosejs.com/docs/queries.html), limit, skip and sort. <br> For example: <br> **/api/users?conditions={"name":"john"}&limit=10&skip=1&sort=-zipcode** | Get the addressed document. |
| POST          | Create a new document and send it back. |  Update the addressed document with specified attributes. |
| PUT           | Create a new document and send it back. | Replace the addressed document. |
| DELETE        | n/a | Delete the addressed document. |
| PATCH         | n/a | Update the addressed document with specified attributes. |
