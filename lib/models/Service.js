import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, "L'icône est requise"],
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
  },
  image: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

export default Service;