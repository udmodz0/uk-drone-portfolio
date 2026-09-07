import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CaaBadge from './components/CaaBadge';
import Services from './components/Services';
import Packages from './components/Packages';
import VideoShowcase from './components/VideoShowcase';
import PhotoGallery from './components/PhotoGallery';
import Equipment from './components/Equipment';
import BookingNotice from './components/BookingNotice';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import ContactModal from './components/ContactModal';
import InteractiveBackground from './components/InteractiveBackground';
import { getStoredData, saveStoredData } from './utils/initialData';

export default function App() {
  const [siteData, setSiteData] = useState(getStoredData());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Sync state to localStorage whenever modified
  const handleSaveData = (newData) => {
    setSiteData(newData);
    saveStoredData(newData);
  };

  const handleSelectPackage = (name, price) => {
    setSelectedPackage(`${name} (${price})`);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 font-sans selection:bg-gold-500 selection:text-black relative overflow-x-hidden">
      
      {/* Interactive Particle Constellation Canvas Background */}
      <InteractiveBackground />

      {/* Navigation Header Dock */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <CaaBadge />
        <Services />
        <Packages onSelectPackage={handleSelectPackage} siteData={siteData} />
        <VideoShowcase />
        <PhotoGallery />
        <Equipment />
        <BookingNotice contactData={siteData.contact} onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} contactData={siteData.contact} />

      {/* Interactive Modals */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteData={siteData}
        onSaveData={handleSaveData}
      />

      <ContactModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPackage={selectedPackage}
        contactData={siteData.contact}
      />

    </div>
  );
}
