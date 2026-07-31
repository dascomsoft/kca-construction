import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['chantier', 'structure', 'technique', 'finition', 'villa', 'interieur'],
  },
  image: {
    type: String,
    required: [true, "L'image est requise"],
  },
  description: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;