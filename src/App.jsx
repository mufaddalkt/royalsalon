import React from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SalonExperience } from './components/SalonExperience';
import { GallerySection } from './components/GallerySection';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { LookupSection } from './components/LookupSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

/* Full-screen booking overlay triggered from Navbar / Hero / etc. */
const BookingOverlay = () => {
  const { isQuickBookingOpen, setIsQuickBookingOpen } = useSalon();
  if (!isQuickBookingOpen) return null;

  return (
    <div
      onClick={() => setIsQuickBookingOpen(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 800,
        background: 'rgba(23,23,23,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflowY: 'auto',
        paddingTop: 60,
        paddingBottom: 40,
      }}
      className="anim-fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 16px',
        }}
      >
        <BookingModal isOverlayMode={true} onCloseOverlay={() => setIsQuickBookingOpen(false)} />
      </div>
    </div>
  );
};

const MainContent = () => {
  const { activeTab, toasts, removeToast } = useSalon();

  return (
    <main>
      {/* Toast Notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Floating booking overlay */}
      <BookingOverlay />

      {activeTab === 'home' && (
        <>
          <Hero />
          <ServiceCatalog />
          <WhyChooseUs />
          <SalonExperience />
          <GallerySection />
          <Testimonials />
          <ContactSection />
        </>
      )}

      {activeTab === 'services' && <ServiceCatalog />}
      {activeTab === 'book'     && <BookingModal />}
      {activeTab === 'lookup'   && <LookupSection />}
      {activeTab === 'admin'    && <AdminDashboard />}
    </main>
  );
};

export default function App() {
  return (
    <SalonProvider>
      <div style={{ minHeight: '100vh', background: '#F7F7F5' }}>
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </SalonProvider>
  );
}
