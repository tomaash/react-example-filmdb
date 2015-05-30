import mongoose from 'mongoose';
const DirectorSchema = new mongoose.Schema({
    name: String,
    nationality: String,
    birthday: Date,
    biography: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

export default mongoose.model('director', DirectorSchema);

