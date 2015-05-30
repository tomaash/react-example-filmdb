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

export default mongoose.model('film', FilmSchema);
