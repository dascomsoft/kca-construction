import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    required: [true, "L'URL de la vidéo est requise"],
  },
  thumbnail: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['chantier', 'presentation', 'tutoriel', 'projet'],
    default: 'projet',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  duration: {
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

const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);

export default Video;