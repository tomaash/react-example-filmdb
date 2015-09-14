import mongoose from 'mongoose';
const FilmSchema = new mongoose.Schema({
  name: String,
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'director'
  },
  description: String,
  year: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FilmSchema.methods.fromSameDirector = function fromSameDirector () {
  return mongoose.model('film').find({ director: this.director }).exec();
};

FilmSchema.statics.search = function search (query) {
  return this.where('name', new RegExp(query.q, 'i')).exec();
};

export default mongoose.model('film', FilmSchema);
