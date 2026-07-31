'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminProjects from './AdminProjects';
import AdminServices from './AdminServices';
import AdminGallery from './AdminGallery';
import AdminVideos from './AdminVideos';

export default function AdminLayout({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    router.push('/admin/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (children) return children;
    
    switch (activeTab) {
      case 'projects':
        return <AdminProjects />;
      case 'services':
        return <AdminServices />;
      case 'gallery':
        return <AdminGallery />;
      case 'videos':
        return <AdminVideos />;
      default:
        return <AdminDashboard onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-20 lg:pt-6">
        {renderContent()}
      </div>
    </div>
  );
}