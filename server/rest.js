import generateApi from 'koa-mongo-rest';
import koaRouter from 'koa-router';

export default function(app) {
  const mongoUrl = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || '127.0.0.1:27017/isofilmdb';
  const mongoose = require('mongoose');
  mongoose.connect(mongoUrl);

  const CarSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number
  });

  const CarModel = mongoose.model('cars', CarSchema);

  const FilmSchema = new mongoose.Schema({
    name: String,
    director: String,
    year: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    likes: {
      type: Number,
      default: 0
    }
  });

  const FilmModel = mongoose.model('films', FilmSchema);

  app.use(koaRouter(app));

  generateApi(app, CarModel, '/api');
  generateApi(app, FilmModel, '/api');
}

