import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function fixSlugs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Charger le modèle
    const { default: Project } = await import('../lib/models/Project.js');

    const projects = await Project.find({
      $or: [{ slug: null }, { slug: '' }, { slug: { $exists: false } }]
    });

    console.log('🔧', projects.length, 'projets sans slug trouvés');

    for (const project of projects) {
      if (!project.title) {
        console.log('⚠️  Ignoré (pas de titre):', project._id.toString());
        continue;
      }
      await project.save(); // déclenche le pre('save')
      console.log('✅', project.title, '→', project.slug);
    }

    console.log('🎉 Terminé !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

fixSlugs();