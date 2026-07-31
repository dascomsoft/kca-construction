'use client'

import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram,
  faTools,
  faImages,
  faVideo,
  faPlus,
  faArrowRight,
  faChartLine,
  faBuilding,
  faClock,
  faRocket,
  faEye,
  faArrowUp,
  faArrowDown,
  faTimes,
  faUpload,
  faSpinner,
  faRulerCombined,
  faFileSignature,
  faHelmetSafety,
  faTree,
  faWater,
  faBolt,
  faWrench,
  faPaintRoller,
  faTh,
  faCalculator,
  faPalette,
  faLayerGroup,
  faCube,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// ============ CONSTANTES ============
const CATEGORIES_PROJECT = ['Villa', 'Commercial', 'Résidentiel', 'Industriel', 'Autre'];
const CATEGORIES_GALLERY = [
  { value: 'chantier', label: 'Chantier' },
  { value: 'structure', label: 'Structure' },
  { value: 'technique', label: 'Technique' },
  { value: 'finition', label: 'Finition' },
  { value: 'villa', label: 'Villa' },
  { value: 'interieur', label: 'Intérieur' },
];
const CATEGORIES_VIDEO = [
  { value: 'chantier', label: 'Chantier' },
  { value: 'presentation', label: 'Présentation' },
  { value: 'tutoriel', label: 'Tutoriel' },
  { value: 'projet', label: 'Projet' },
];
const ICONS_LIST = [
  'faRulerCombined', 'faFileSignature', 'faHelmetSafety',
  'faTree', 'faWater', 'faBolt', 'faWrench', 'faPaintRoller',
  'faTh', 'faCalculator', 'faPalette', 'faLayerGroup', 'faCube'
];

// ============ MAPPING DES ICÔNES ============
const iconMap = {
  faRulerCombined, faFileSignature, faHelmetSafety,
  faTree, faWater, faBolt, faWrench, faPaintRoller,
  faTh, faCalculator, faPalette, faLayerGroup, faCube,
};

// ============ COMPOSANT MODAL ============
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-slate-400" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ============ FORMULAIRE PROJET ============
const ProjectForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', category: 'Villa', location: '', description: '',
    details: '', date: '', client: '', image: '', featured: false,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert(data.message || "Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            {CATEGORIES_PROJECT.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Lieu *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="2024"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description courte *</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Détails *</label>
        <textarea
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          rows={3}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Client *</label>
          <input
            type="text"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image principale *</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="project-image-upload"
              required
            />
            <label
              htmlFor="project-image-upload"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors"
            >
              <FontAwesomeIcon icon={faUpload} />
              Choisir une image
            </label>
            {imagePreview && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                <Image src={imagePreview} alt="Aperçu" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-slate-700">
          Projet en vedette
        </label>
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <><FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> Ajout en cours...</>
          ) : 'Ajouter le projet'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="py-3 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

// ============ FORMULAIRE SERVICE ============
const ServiceForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', icon: 'faRulerCombined', description: '', featured: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert(data.message || "Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Icône *</label>
        <div className="flex items-center gap-3">
          <select
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            {ICONS_LIST.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl flex-shrink-0">
            <FontAwesomeIcon icon={iconMap[formData.icon] || faTools} />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="service-featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="service-featured" className="text-sm font-medium text-slate-700">
          Service en vedette
        </label>
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <><FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> Ajout en cours...</>
          ) : 'Ajouter le service'}
        </button>
        <button onClick={onClose} className="py-3 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  );
};

// ============ FORMULAIRE GALERIE ============
const GalleryForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', category: 'chantier', image: '', description: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert(data.message || "Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie *</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          {CATEGORIES_GALLERY.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Image *</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="gallery-image-upload"
            required
          />
          <label
            htmlFor="gallery-image-upload"
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors"
          >
            <FontAwesomeIcon icon={faUpload} />
            Choisir une image
          </label>
          {imagePreview && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
              <Image src={imagePreview} alt="Aperçu" fill className="object-cover" />
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description (optionnel)</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
        />
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <><FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> Ajout en cours...</>
          ) : "Ajouter l'image"}
        </button>
        <button onClick={onClose} className="py-3 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  );
};

// ============ FORMULAIRE VIDEO ============
const VideoForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', url: '', category: 'projet',
    featured: false, duration: '',
  });
  const [thumbnail, setThumbnail] = useState('');

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    const videoId = getYouTubeId(url);
    setThumbnail(videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '');
    setFormData({ ...formData, url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, thumbnail }),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert(data.message || "Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">URL YouTube *</label>
        <input
          type="url"
          value={formData.url}
          onChange={handleUrlChange}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
        {thumbnail && (
          <div className="mt-2 flex items-center gap-3">
            <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <img src={thumbnail} alt="Aperçu vidéo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-500">Aperçu YouTube</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          {CATEGORIES_VIDEO.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Durée (optionnel)</label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="3:45"
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description (optionnel)</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="video-featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="video-featured" className="text-sm font-medium text-slate-700">
          Vidéo en vedette
        </label>
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <><FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> Ajout en cours...</>
          ) : 'Ajouter la vidéo'}
        </button>
        <button onClick={onClose} className="py-3 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
          Annuler
        </button>
      </div>
    </form>
  );
};

// ============ COMPOSANT PRINCIPAL ============
export default function AdminDashboard({ onTabChange }) {
  const [stats, setStats] = useState({ projects: 0, services: 0, gallery: 0, videos: 0 });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: null });

  const trends = {
    projects: { change: 12, direction: 'up' },
    services: { change: 8, direction: 'up' },
    gallery: { change: 23, direction: 'up' },
    videos: { change: -2, direction: 'down' },
  };

  const fetchStats = useCallback(async () => {
    try {
      const [projectsRes, servicesRes, galleryRes, videosRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/services'),
        fetch('/api/gallery'),
        fetch('/api/videos'),
      ]);

      const [projects, services, gallery, videos] = await Promise.all([
        projectsRes.json(),
        servicesRes.json(),
        galleryRes.json(),
        videosRes.json(),
      ]);

      setStats({
        projects: projects.data?.length || 0,
        services: services.data?.length || 0,
        gallery: gallery.data?.length || 0,
        videos: videos.data?.length || 0,
      });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecentActivity = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        const recent = data.data.slice(0, 4).map(p => ({
          title: p.title,
          date: new Date(p.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'short', year: 'numeric'
          }),
          type: 'projet',
          status: Math.random() > 0.5 ? 'Terminé' : 'En cours',
        }));
        setRecentActivity(recent);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchRecentActivity();
  }, [fetchStats, fetchRecentActivity]);

  const handleTabChange = (tab) => onTabChange?.(tab);
  const openModal = (type) => setModal({ isOpen: true, type });
  const closeModal = () => setModal({ isOpen: false, type: null });
  const handleSuccess = () => { fetchStats(); fetchRecentActivity(); };

  const statCards = [
    { title: 'Projets', count: stats.projects, icon: faProjectDiagram, bgGradient: 'from-blue-50 to-blue-100', textColor: 'text-blue-600', borderColor: 'border-blue-200', trend: trends.projects, tab: 'projects' },
    { title: 'Services', count: stats.services, icon: faTools, bgGradient: 'from-emerald-50 to-emerald-100', textColor: 'text-emerald-600', borderColor: 'border-emerald-200', trend: trends.services, tab: 'services' },
    { title: 'Galerie', count: stats.gallery, icon: faImages, bgGradient: 'from-purple-50 to-purple-100', textColor: 'text-purple-600', borderColor: 'border-purple-200', trend: trends.gallery, tab: 'gallery' },
    { title: 'Vidéos', count: stats.videos, icon: faVideo, bgGradient: 'from-rose-50 to-rose-100', textColor: 'text-rose-600', borderColor: 'border-rose-200', trend: trends.videos, tab: 'videos' },
  ];

  const quickActions = [
    { label: 'Nouveau projet', icon: faPlus, bg: 'bg-blue-500', type: 'project', description: 'Ajouter une réalisation' },
    { label: 'Nouveau service', icon: faPlus, bg: 'bg-emerald-500', type: 'service', description: 'Ajouter une offre' },
    { label: 'Nouvelle image', icon: faPlus, bg: 'bg-purple-500', type: 'gallery', description: 'Ajouter à la galerie' },
    { label: 'Nouvelle vidéo', icon: faPlus, bg: 'bg-rose-500', type: 'video', description: 'Ajouter un contenu vidéo' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tableau de bord</h1>
          <p className="text-sm text-slate-500 mt-1">Vue d'ensemble de votre activité sur KCA Construction</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-700">Système opérationnel</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, index) => (
          <div
            key={index}
            onClick={() => handleTabChange(stat.tab)}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{stat.count}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.trend.direction === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      <FontAwesomeIcon icon={stat.trend.direction === 'up' ? faArrowUp : faArrowDown} className="text-[10px]" />
                      {stat.trend.change}%
                    </span>
                    <span className="text-xs text-slate-400">vs mois dernier</span>
                  </div>
                  <div className="mt-3 overflow-hidden">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Gérer <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                    </span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0`}>
                  <FontAwesomeIcon icon={stat.icon} className={`text-2xl ${stat.textColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </div>
              <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${stat.textColor.replace('text', 'bg')}`} style={{ width: `${Math.min((stat.count / 20) * 100, 100)}%`, opacity: stat.count > 0 ? 1 : 0.3 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Actions rapides</h3>
            <p className="text-sm text-slate-500 mt-0.5">Ajoutez du contenu en un clic</p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">4 actions disponibles</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => openModal(action.type)}
              className="group relative p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl hover:from-slate-100 hover:to-slate-200 transition-all duration-300 hover:scale-[1.02] text-center border border-slate-200 hover:border-slate-300"
            >
              <div className={`w-14 h-14 mx-auto ${action.bg} rounded-2xl flex items-center justify-center text-white group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                <FontAwesomeIcon icon={action.icon} className="text-xl" />
              </div>
              <p className="text-sm font-semibold text-slate-700 mt-3 group-hover:text-slate-900 transition-colors">{action.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{action.description}</p>
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${action.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </button>
          ))}
        </div>
      </div>

      {/* Activité récente et statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Activité récente</h3>
              <p className="text-sm text-slate-500 mt-0.5">Dernières mises à jour</p>
            </div>
            <FontAwesomeIcon icon={faClock} className="text-slate-300" />
          </div>
          {recentActivity.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faRocket} className="text-slate-300 text-2xl" />
              </div>
              <p className="text-slate-500 text-sm">Aucune activité récente</p>
              <p className="text-slate-400 text-xs mt-1">Les nouveaux contenus apparaîtront ici</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-200 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FontAwesomeIcon icon={faBuilding} className="text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{activity.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-slate-500">{activity.date}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${activity.status === 'Terminé' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Aperçu</h3>
              <p className="text-sm text-slate-500 mt-0.5">Distribution du contenu</p>
            </div>
            <FontAwesomeIcon icon={faChartLine} className="text-slate-300" />
          </div>
          <div className="space-y-5">
            {statCards.map((stat, index) => {
              const percentage = stat.count > 0 ? Math.round((stat.count / Math.max(stats.projects, stats.services, stats.gallery, stats.videos, 1)) * 100) : 0;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-slate-600">{stat.title}</span>
                    <span className="font-semibold text-slate-900">{stat.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${stat.textColor.replace('text', 'bg')}`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Total éléments</span>
              <span className="font-bold text-slate-900">{stats.projects + stats.services + stats.gallery + stats.videos}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-slate-500">Taux de complétion</span>
              <span className="font-bold text-emerald-600">85%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <Modal isOpen={modal.isOpen} onClose={closeModal} title={
        modal.type === 'project' ? 'Ajouter un projet' :
        modal.type === 'service' ? 'Ajouter un service' :
        modal.type === 'gallery' ? 'Ajouter une image' :
        modal.type === 'video' ? 'Ajouter une vidéo' : ''
      }>
        {modal.type === 'project' && <ProjectForm onClose={closeModal} onSuccess={handleSuccess} />}
        {modal.type === 'service' && <ServiceForm onClose={closeModal} onSuccess={handleSuccess} />}
        {modal.type === 'gallery' && <GalleryForm onClose={closeModal} onSuccess={handleSuccess} />}
        {modal.type === 'video' && <VideoForm onClose={closeModal} onSuccess={handleSuccess} />}
      </Modal>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}