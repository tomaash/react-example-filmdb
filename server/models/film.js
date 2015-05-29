import mongoose from 'mongoose';
const FilmSchema = new mongoose.Schema({
  name: String,
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'directors'
  },
  description: String,
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

export default mongoose.model('film', FilmSchema);
