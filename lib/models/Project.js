import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    // ❌ PAS de required: true ici — le middleware le génère
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['Villa', 'Commercial', 'Résidentiel', 'Industriel', 'Autre'],
  },
  location: {
    type: String,
    required: [true, 'Le lieu est requis'],
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
  },
  details: {
    type: String,
    required: [true, 'Les détails sont requis'],
  },
  date: {
    type: String,
    required: [true, 'La date est requise'],
  },
  client: {
    type: String,
    required: [true, 'Le client est requis'],
  },
  image: {
    type: String,
    required: [true, "L'image principale est requise"],
  },
  images: {
    type: [String],
    default: [],
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

// Middleware pour générer le slug automatiquement
ProjectSchema.pre('save', async function() {
  if (!this.slug && this.title) {
    let slug = this.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Vérifier l'unicité
    const ProjectModel = mongoose.model('Project');
    let counter = 1;
    let newSlug = slug;
    while (await ProjectModel.findOne({ slug: newSlug, _id: { $ne: this._id } })) {
      newSlug = `${slug}-${counter}`;
      counter++;
    }
    
    this.slug = newSlug;
  }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;