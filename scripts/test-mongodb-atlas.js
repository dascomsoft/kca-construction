const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI non définie dans .env.local');
  console.log('\n💡 Ajoutez dans .env.local:');
  console.log('MONGODB_URI=mongodb+srv://votre_user:votre_pass@cluster.mongodb.net/kcaconstruction');
  process.exit(1);
}

async function testMongoDBAtlas() {
  console.log('🔍 Test de connexion à MongoDB Atlas...');
  console.log(`📍 URI: ${MONGODB_URI.replace(/\/\/.*@/, '//*****@')}`);
  console.log('⏳ Connexion en cours...\n');
  
  try {
    // Options de connexion optimisées pour MongoDB Atlas
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4,
    };

    const conn = await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ Connexion réussie !');
    console.log('═'.repeat(50));
    console.log(`📊 Base de données : ${conn.connection.db.databaseName}`);
    console.log(`🔗 Host : ${conn.connection.host}`);
    console.log(`📦 Port : ${conn.connection.port}`);
    console.log(`📁 Collections :`);
    
    // Lister les collections
    const collections = await conn.connection.db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('   (Aucune collection pour le moment - Base de données vide)');
    } else {
      collections.forEach((col, index) => {
        console.log(`   ${index + 1}. ${col.name}`);
      });
    }
    
    console.log('═'.repeat(50));
    console.log('\n💡 MongoDB Atlas est prêt à être utilisé !');
    
    // Fermer la connexion
    await mongoose.disconnect();
    console.log('🔌 Déconnexion réussie');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur de connexion:', error.message);
    
    console.log('\n🔍 Solutions possibles:');
    console.log('1. Vérifiez votre connexion Internet');
    console.log('2. Vérifiez que l\'URI est correcte');
    console.log('3. Vérifiez les IP autorisées dans MongoDB Atlas:');
    console.log('   - Allez dans Network Access');
    console.log('   - Ajoutez votre IP ou 0.0.0.0/0');
    console.log('4. Vérifiez le nom d\'utilisateur et mot de passe');
    console.log('5. Vérifiez que la base de données existe');
    console.log('6. Vérifiez les permissions de l\'utilisateur');
    console.log('7. Vérifiez les logs MongoDB Atlas');
    
    // Débug supplémentaire
    console.log('\n📋 Détails de l\'erreur:', error);
    
    process.exit(1);
  }
}

// Exécuter le test
testMongoDBAtlas();