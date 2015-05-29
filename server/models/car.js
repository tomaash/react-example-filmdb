import mongoose from 'mongoose';
const CarSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number
});

export default mongoose.model('Car', CarSchema);
