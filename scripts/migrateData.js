const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI non définie dans .env.local');
  process.exit(1);
}

// Importer les modèles
const Project = require('../lib/models/Project').default;
const Service = require('../lib/models/Service').default;
const Gallery = require('../lib/models/Gallery').default;
const Video = require('../lib/models/Video').default;

const initialData = {
  projects: [
    {
      title: 'Villa Moderne - Douala',
      slug: 'villa-moderne-douala',
      category: 'Villa',
      location: 'Makepe, Douala',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
      description: "Construction d'une villa de standing avec piscine et jardin.",
      details: 'Cette villa moderne de 4 chambres a été construite sur un terrain de 800m².',
      date: '2023',
      client: 'Jean-Pierre N.',
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop'],
      featured: true,
    },
    {
      title: 'Immeuble Commercial - Douala',
      slug: 'immeuble-commercial-douala',
      category: 'Commercial',
      location: 'Bonapriso, Douala',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: "Construction d'un immeuble de 5 étages pour bureaux.",
      details: 'Immeuble de 5 étages avec parking souterrain et climatisation centrale.',
      date: '2023',
      client: 'Promoteur immobilier',
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop'],
    },
    {
      title: 'Complexe Résidentiel - Yaoundé',
      slug: 'complexe-residentiel-yaounde',
      category: 'Résidentiel',
      location: 'Bastos, Yaoundé',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
      description: 'Réalisation de 8 villas de luxe en gated community.',
      details: '8 villas de luxe avec piscine collective et sécurisation 24h/24.',
      date: '2024',
      client: 'Investisseur privé',
      images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop'],
    },
    {
      title: 'Bâtiment Industriel - Kribi',
      slug: 'batiment-industriel-kribi',
      category: 'Industriel',
      location: 'Kribi, Cameroun',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: "Construction d'un bâtiment industriel de 2000m² avec bureaux.",
      details: 'Bâtiment industriel de 2000m² avec bureaux et parking.',
      date: '2024',
      client: 'Industrie Camerounaise',
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop'],
    },
  ],
  services: [
    {
      title: 'Études du sol',
      icon: 'faRulerCombined',
      description: 'Analyses géotechniques approfondies pour garantir la stabilité de vos constructions.',
      featured: true,
    },
    {
      title: 'Permis de bâtir',
      icon: 'faFileSignature',
      description: "Assistance administrative complète pour l'obtention de vos autorisations.",
      featured: true,
    },
    {
      title: 'Maçonnerie',
      icon: 'faHelmetSafety',
      description: 'Réalisation de structures solides : fondations, murs, dalles et éléments porteurs.',
    },
    {
      title: 'Charpente',
      icon: 'faTree',
      description: 'Conception et pose de charpentes en bois ou métal pour toitures.',
    },
    {
      title: 'Réservations',
      icon: 'faWater',
      description: "Réalisation de réservoirs, bassins et citernes pour la gestion des eaux.",
    },
    {
      title: 'Électricité',
      icon: 'faBolt',
      description: 'Installations électriques complètes : éclairage, puissance, sécurité et domotique.',
    },
    {
      title: 'Plomberie',
      icon: 'faWrench',
      description: "Installation de réseaux d'eau, d'assainissement et de systèmes de chauffage.",
    },
    {
      title: 'Peinture',
      icon: 'faPaintRoller',
      description: 'Peinture intérieure et extérieure avec des finitions de qualité supérieure.',
    },
    {
      title: 'Carrelage',
      icon: 'faTh',
      description: 'Pose de carrelage, faïence et autres revêtements de sol et de mur.',
    },
    {
      title: 'Calcul de structure',
      icon: 'faCalculator',
      description: 'Études structurelles détaillées pour la sécurité de vos bâtiments.',
    },
    {
      title: 'Décoration murale',
      icon: 'faPalette',
      description: 'Création de décors muraux personnalisés pour vos espaces intérieurs.',
    },
    {
      title: 'Résine époxy',
      icon: 'faLayerGroup',
      description: 'Application de résine époxy pour des sols industriels haute résistance.',
    },
    {
      title: 'Métal déployé',
      icon: 'faCube',
      description: "Création d'éléments décoratifs et architecturaux en métal déployé.",
    },
  ],
  gallery: [
    {
      title: 'Équipe technique sur chantier',
      category: 'chantier',
      image: '/images/technical-staff.jpeg',
      description: 'Notre équipe en action',
    },
    {
      title: 'Charpente métallique',
      category: 'structure',
      image: '/images/charpente.jpeg',
      description: 'Installation de charpente métallique',
    },
    {
      title: 'Structure en bois',
      category: 'structure',
      image: '/images/charpente1.jpeg',
      description: 'Structure en bois pour toiture',
    },
    {
      title: 'Décoration métal déployé',
      category: 'finition',
      image: '/images/decoration-metal.jpg',
      description: 'Décoration avec métal déployé',
    },
    {
      title: 'Décoration murale',
      category: 'finition',
      image: '/images/decoration-mural.jpg',
      description: 'Décoration murale personnalisée',
    },
    {
      title: 'Installation électrique',
      category: 'technique',
      image: '/images/electricite.jpeg',
      description: 'Installation électrique professionnelle',
    },
    {
      title: 'Étude du sol',
      category: 'technique',
      image: '/images/etude-sol.jpeg',
      description: 'Analyse géotechnique du sol',
    },
    {
      title: 'Travaux de maçonnerie',
      category: 'technique',
      image: '/images/maconnerie.jpg',
      description: 'Travaux de maçonnerie',
    },
    {
      title: 'Peinture et finitions',
      category: 'finition',
      image: '/images/peinture.webp',
      description: 'Peinture intérieure',
    },
    {
      title: 'Permis de bâtir',
      category: 'technique',
      image: '/images/permis-batir.jpg',
      description: 'Obtention du permis de bâtir',
    },
    {
      title: 'Installation plomberie',
      category: 'technique',
      image: '/images/plomberie.jpg',
      description: 'Installation sanitaire',
    },
    {
      title: 'Réservations',
      category: 'structure',
      image: '/images/reservation.jpg',
      description: 'Construction de réservoirs',
    },
    {
      title: 'Pose résine époxy',
      category: 'finition',
      image: '/images/resine-epoxy.jpeg',
      description: 'Application de résine époxy',
    },
    {
      title: 'Pose carrelage',
      category: 'structure',
      image: '/images/carrelage.webp',
      description: 'Pose de carrelage',
    },
    {
      title: 'Calcul de structure',
      category: 'structure',
      image: '/images/calcul-structure.jpeg',
      description: 'Étude de structure',
    },
  ],
};

async function migrateData() {
  try {
    console.log('🔄 Connexion à MongoDB Atlas...');
    console.log('⏳ Tentative de connexion avec timeouts augmentés...');
    
    // AUGMENTER LES TIMEOUTS
    const options = {
      serverSelectionTimeoutMS: 60000,  // 60 secondes
      connectTimeoutMS: 60000,          // 60 secondes
      socketTimeoutMS: 120000,          // 2 minutes
      maxPoolSize: 10,
      family: 4,
      retryWrites: true,
      w: 'majority',
    };

    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ Connecté à MongoDB Atlas');
    
    // Supprimer les données existantes
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Gallery.deleteMany({});
    await Video.deleteMany({});
    console.log('🗑️ Données existantes supprimées');
    
    // Insérer les projets
    if (initialData.projects.length > 0) {
      const projects = await Project.insertMany(initialData.projects);
      console.log(`✅ ${projects.length} projets insérés`);
    }
    
    // Insérer les services
    if (initialData.services.length > 0) {
      const services = await Service.insertMany(initialData.services);
      console.log(`✅ ${services.length} services insérés`);
    }
    
    // Insérer la galerie
    if (initialData.gallery.length > 0) {
      const gallery = await Gallery.insertMany(initialData.gallery);
      console.log(`✅ ${gallery.length} images de galerie insérées`);
    }
    
    console.log('\n🎉 Migration terminée avec succès !');
    console.log(`📊 Projets: ${await Project.countDocuments()}`);
    console.log(`📊 Services: ${await Service.countDocuments()}`);
    console.log(`📊 Galerie: ${await Gallery.countDocuments()}`);
    console.log(`📊 Vidéos: ${await Video.countDocuments()}`);
    
    await mongoose.disconnect();
    console.log('🔌 Déconnexion réussie');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error.message);
    console.error('Détails:', error);
    
    console.log('\n💡 Solutions possibles:');
    console.log('1. Vérifiez votre connexion Internet');
    console.log('2. Essayez avec un réseau différent');
    console.log('3. Utilisez un VPN si vous êtes dans un pays avec restrictions');
    console.log('4. Vérifiez que votre IP est autorisée dans MongoDB Atlas');
    console.log('5. Essayez la version simplifiée ci-dessous');
    
    process.exit(1);
  }
}

migrateData();