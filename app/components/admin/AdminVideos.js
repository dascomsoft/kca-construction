'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faSpinner,
  faTimes,
  faVideo,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnail: '',
    category: 'projet',
    featured: false,
    duration: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'chantier', label: 'Chantier' },
    { value: 'presentation', label: 'Présentation' },
    { value: 'tutoriel', label: 'Tutoriel' },
    { value: 'projet', label: 'Projet' },
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      if (data.success) {
        setVideos(data.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = '/api/videos';
      const method = 'POST';
      const body = editingVideo ? { ...formData, _id: editingVideo._id } : formData;

      const res = await fetch(url, {
        method: editingVideo ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        await fetchVideos();
        resetForm();
        setShowForm(false);
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setError('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) return;

    try {
      const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await fetchVideos();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      url: video.url,
      thumbnail: video.thumbnail || '',
      category: video.category || 'projet',
      featured: video.featured || false,
      duration: video.duration || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      url: '',
      thumbnail: '',
      category: 'projet',
      featured: false,
      duration: '',
    });
    setError('');
  };

  // Extraire l'ID de la vidéo YouTube
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Générer l'URL de la vignette YouTube
  const getYouTubeThumbnail = (url) => {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : '';
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    const thumbnail = getYouTubeThumbnail(url);
    setFormData({
      ...formData,
      url,
      thumbnail: thumbnail || formData.thumbnail,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className='pt-20'>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des vidéos</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} />
          Ajouter une vidéo
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingVideo ? 'Modifier la vidéo' : 'Ajouter une vidéo'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL YouTube *
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={handleUrlChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                {formData.thumbnail && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                      <img
                        src={formData.thumbnail}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-500">Aperçu YouTube</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="3:45"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optionnel)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-video"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-700 rounded"
                />
                <label htmlFor="featured-video" className="text-sm font-medium text-gray-700">
                  Vidéo en vedette
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                      Enregistrement...
                    </>
                  ) : (
                    editingVideo ? 'Mettre à jour' : 'Ajouter'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des vidéos */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vidéo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vedette
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {videos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Aucune vidéo pour le moment
                  </td>
                </tr>
              ) : (
                videos.map((video) => (
                  <tr key={video._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-gray-900">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/30">
                            <FontAwesomeIcon icon={faVideo} className="text-2xl" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FontAwesomeIcon icon={faPlay} className="text-white/70 text-xl" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{video.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {categories.find(c => c.value === video.category)?.label || video.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{video.duration || '-'}</td>
                    <td className="px-6 py-4">
                      {video.featured && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(video)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}