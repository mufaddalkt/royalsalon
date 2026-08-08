import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';

export const Navbar = () => {
  const { activeTab, setActiveTab, setIsQuickBookingOpen } = useSalon();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { id: 'home',     label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about',    label: 'About' },
    { id: 'gallery',  label: 'Gallery' },
    { id: 'contact',  label: 'Contact' },
    { id: 'lookup',   label: 'My Booking' },
  ];

  const go = (id) => {
    setActiveTab(id === 'about' || id === 'gallery' || id === 'contact' ? 'home' : id);
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 60);
  };

  return (
    <>
      {/* Desktop / Tablet floating navbar */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <nav
          className={`pointer-events-auto mt-4 sm:mt-5 w-full max-w-5xl flex items-center justify-between px-5 py-3 navbar-glass transition-all duration-300 ${
            scrolled ? 'navbar-glass-scrolled mt-3 py-2.5' : ''
          }`}
          style={{ borderRadius: 18 }}
        >
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 group"
          >
            <div
              style={{
                width: 30, height: 30,
                background: '#111',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'transform 0.3s',
              }}
              className="group-hover:scale-105"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="1.5"/>
                <path d="M10 5v10M5 10h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 600, color: '#171717', letterSpacing: '0.01em' }}>
              Royal Salon
            </span>
          </button>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-1">
            {nav.map(link => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: activeTab === link.id ? 600 : 400,
                  color: activeTab === link.id ? '#111' : '#6B6B6B',
                  background: activeTab === link.id ? '#F0F0ED' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  if (activeTab !== link.id) e.currentTarget.style.color = '#111';
                }}
                onMouseLeave={e => {
                  if (activeTab !== link.id) e.currentTarget.style.color = '#6B6B6B';
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Book CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQuickBookingOpen(true)}
              className="hidden sm:flex btn btn-primary"
              style={{ padding: '9px 22px', fontSize: 12, letterSpacing: '0.03em' }}
            >
              Book Appointment
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer' }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              <span style={{ width: 18, height: 1.5, background: '#111', display: 'block', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
              <span style={{ width: 18, height: 1.5, background: '#111', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.2s' }} />
              <span style={{ width: 18, height: 1.5, background: '#111', display: 'block', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile full-screen overlay menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col anim-fade-in"
          style={{ background: 'rgba(247,247,245,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
            {nav.map((link, i) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="anim-fade-up"
                style={{
                  animationDelay: `${i * 0.06}s`,
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 32,
                  fontWeight: 500,
                  color: activeTab === link.id ? '#111' : '#A0A0A0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setIsQuickBookingOpen(true); }}
              className="btn btn-primary mt-4 anim-fade-up delay-5"
              style={{ padding: '14px 40px', fontSize: 13 }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
};
