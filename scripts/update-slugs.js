const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function updateSlugs() {
  try {
    console.log('🔄 Connexion à MongoDB Atlas...');
    
    // Options de connexion optimisées
    const options = {
      serverSelectionTimeoutMS: 60000, // 60 secondes
      connectTimeoutMS: 60000,
      socketTimeoutMS: 120000,
      maxPoolSize: 10,
      family: 4, // Forcer IPv4
      retryWrites: true,
      w: 'majority',
    };
    
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('✅ Connecté à MongoDB Atlas');
    
    // Récupérer tous les projets
    const projects = await mongoose.connection.db
      .collection('projects')
      .find({})
      .toArray();
    
    console.log(`📋 ${projects.length} projets trouvés\n`);
    
    let updated = 0;
    let skipped = 0;
    
    for (const project of projects) {
      // Si le slug est manquant ou vide
      if (!project.slug || project.slug === '') {
        const slug = project.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // Vérifier si le slug n'existe pas déjà
        const existing = await mongoose.connection.db
          .collection('projects')
          .findOne({ slug: slug, _id: { $ne: project._id } });
        
        let finalSlug = slug;
        if (existing) {
          let counter = 1;
          while (await mongoose.connection.db
            .collection('projects')
            .findOne({ slug: `${slug}-${counter}`, _id: { $ne: project._id } })) {
            counter++;
          }
          finalSlug = `${slug}-${counter}`;
        }
        
        await mongoose.connection.db
          .collection('projects')
          .updateOne(
            { _id: project._id },
            { $set: { slug: finalSlug } }
          );
        
        console.log(`✅ Slug ajouté: ${project.title} → ${finalSlug}`);
        updated++;
      } else {
        console.log(`✓ Slug déjà présent: ${project.title} → ${project.slug}`);
        skipped++;
      }
    }
    
    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ ${updated} projets mis à jour`);
    console.log(`   ✓ ${skipped} projets déjà à jour`);
    console.log(`   📋 ${projects.length} projets au total`);
    
    await mongoose.disconnect();
    console.log('🔌 Déconnecté de MongoDB');
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

updateSlugs();