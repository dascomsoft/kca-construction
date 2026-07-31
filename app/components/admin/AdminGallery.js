'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faSpinner,
  faTimes,
  faUpload,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  { value: 'chantier', label: 'Chantier' },
  { value: 'structure', label: 'Structure' },
  { value: 'technique', label: 'Technique' },
  { value: 'finition', label: 'Finition' },
  { value: 'villa', label: 'Villa' },
  { value: 'interieur', label: 'Intérieur' },
];

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'chantier',
    image: '',
    description: '',
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        await fetchImages();
        resetForm();
        setShowForm(false);
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setError('Erreur lors de l\'enregistrement');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await fetchImages();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'chantier',
      image: '',
      description: '',
    });
    setError('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
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
        <h2 className="text-2xl font-bold">Gestion de la galerie</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} />
          Ajouter une image
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Ajouter une image</h3>
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
                  Catégorie *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
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
                  Image *
                </label>
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
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    Choisir une image
                  </label>
                  {formData.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={formData.image}
                        alt="Aperçu"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
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

              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                      Upload...
                    </>
                  ) : (
                    'Ajouter'
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

      {/* Grille d'images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucune image dans la galerie
          </div>
        ) : (
          images.map((image) => (
            <div
              key={image._id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{image.title}</p>
                <span className="text-xs text-gray-500">
                  {categories.find(c => c.value === image.category)?.label || image.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}