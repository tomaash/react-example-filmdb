koa = require('koa');
router = require('koa-router');
generateApi = require('../lib/index');

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

app = koa();
app.use(router(app));

model = mongoose.model('user', schema);
generateApi(app, model, '/api');

app.listen(process.env.PORT || 5000);
