'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faProjectDiagram,
  faTools,
  faImages,
  faVideo,
  faSignOutAlt,
  faCog,
  faBell,
  faBars,
  faTimes,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: faHome },
  { id: 'projects', label: 'Projets', icon: faProjectDiagram },
  { id: 'services', label: 'Services', icon: faTools },
  { id: 'gallery', label: 'Galerie', icon: faImages },
  { id: 'videos', label: 'Vidéos', icon: faVideo },
];

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuItemClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Version mobile - Menu hamburger
  if (isMobile) {
    return (
      <>
        {/* Barre de navigation mobile */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/KCA-LOGO.png"
                  alt="KCA Construction"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">KCA Admin</span>
                <span className="text-[10px] text-white/40">Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Indicateur de notification */}
              <button className="relative p-2 text-white/60 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faBell} className="text-lg" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {/* Bouton menu hamburger */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Menu"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Overlay du menu mobile */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Menu mobile déroulant */}
        <div
          className={`lg:hidden fixed top-[60px] left-0 right-0 z-40 bg-slate-900 shadow-2xl transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-[calc(100vh-60px)] opacity-100 translate-y-0' 
              : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
          } overflow-y-auto`}
        >
          <div className="p-4 space-y-1">
            {/* Informations utilisateur */}
            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white">Administrateur</p>
                <p className="text-xs text-white/40">admin@kcaconstruction.com</p>
              </div>
            </div>

            {/* Menu items */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5" />
                {item.label}
                {activeTab === item.id && (
                  <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </button>
            ))}

            {/* Séparateur */}
            <div className="my-2 border-t border-white/10" />

            {/* Actions supplémentaires */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/10 transition-colors">
              <FontAwesomeIcon icon={faCog} className="w-5" />
              Paramètres
            </button>
            
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Espace pour compenser la navbar fixe */}
        <div className="lg:hidden h-[60px]" />
      </>
    );
  }

  // Version Desktop - Sidebar complète
  return (
    <div className="hidden lg:flex w-64 bg-slate-900 text-white p-4 flex-col flex-shrink-0 h-screen sticky top-0">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
        <div className="relative w-10 h-10">
          <Image
            src="/images/KCA-LOGO.png"
            alt="KCA Construction"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <span className="text-sm font-bold block">KCA Admin</span>
          <span className="text-[10px] text-white/40">Dashboard v1.0</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5" />
            {item.label}
            {activeTab === item.id && (
              <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-colors">
          <FontAwesomeIcon icon={faBell} className="w-5" />
          Notifications
          <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">3</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-colors">
          <FontAwesomeIcon icon={faCog} className="w-5" />
          Paramètres
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm transition-colors"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}