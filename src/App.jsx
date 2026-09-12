import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MarqueeTicker from './components/MarqueeTicker';
import Hero from './components/Hero';
import AboutIntro from './components/AboutIntro';
import AerialComparisonSlider from './components/AerialComparisonSlider';
import Services from './components/Services';
import Packages from './components/Packages';
import QuoteEstimator from './components/QuoteEstimator';
import VideoShowcase from './components/VideoShowcase';
import PhotoGallery from './components/PhotoGallery';
import Equipment from './components/Equipment';
import CaaBadge from './components/CaaBadge';
import BookingNotice from './components/BookingNotice';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import ContactModal from './components/ContactModal';
import FloatingActionDock from './components/FloatingActionDock';
import InteractiveBackground from './components/InteractiveBackground';
import { getStoredData, saveStoredData } from './utils/initialData';
import { fetchSiteDataFromFirebase, saveSiteDataToFirebase } from './services/firebase';

export default function App() {
  const [siteData, setSiteData] = useState(getStoredData());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Fetch dynamic price configuration from Firebase Firestore on mount
  useEffect(() => {
    let isMounted = true;
    async function syncFirebaseData() {
      const fbData = await fetchSiteDataFromFirebase();
      if (fbData && isMounted) {
        setSiteData((prev) => {
          const merged = { ...prev, ...fbData };
          saveStoredData(merged);
          return merged;
        });
      }
    }
    syncFirebaseData();
    return () => { isMounted = false; };
  }, []);

  // Sync state to localStorage and Firebase Firestore database whenever modified
  const handleSaveData = async (newData) => {
    setSiteData(newData);
    saveStoredData(newData);
    await saveSiteDataToFirebase(newData);
  };

  const handleSelectPackage = (name, price) => {
    setSelectedPackage(`${name} (${price})`);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0D11] text-warm-100 font-sans selection:bg-white/20 selection:text-white relative overflow-x-hidden">
      
      {/* Subtle Atmospheric Vignette Background */}
      <InteractiveBackground />

      {/* Navigation Header */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <MarqueeTicker />
        <AboutIntro onOpenBooking={() => setIsBookingOpen(true)} />
        <AerialComparisonSlider />
        <Services />
        <Packages onSelectPackage={handleSelectPackage} siteData={siteData} />
        <QuoteEstimator onOpenBooking={() => setIsBookingOpen(true)} whatsappNumber={siteData.contact.cleanNumber} />
        <VideoShowcase />
        <PhotoGallery />
        <Equipment />
        <CaaBadge />
        <BookingNotice contactData={siteData.contact} onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} contactData={siteData.contact} />

      {/* Floating Quick Action Dock */}
      <FloatingActionDock 
        onOpenBooking={() => setIsBookingOpen(true)}
        whatsappNumber={siteData.contact.cleanNumber}
      />

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
