import React from 'react';
import { useSalon } from '../context/SalonContext';

export const Footer = () => {
  const { setActiveTab, setIsQuickBookingOpen } = useSalon();

  const go = (id) => {
    setActiveTab(['services', 'lookup', 'admin'].includes(id) ? id : 'home');
    window.scrollTo({ top: 0 });
  };

  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #E8E8E5' }}>

      {/* Large CTA block */}
      <div
        style={{
          background: '#F7F7F5',
          padding: '100px 24px',
          textAlign: 'center',
          borderBottom: '1px solid #E8E8E5',
        }}
      >
        <span className="eyebrow" style={{ textAlign: 'center' }}>Ready to begin?</span>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600, color: '#171717',
            lineHeight: 1.06, letterSpacing: '-0.02em',
            marginBottom: 20, maxWidth: 560, margin: '0 auto 20px',
          }}
        >
          Book your<br />
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#6B6B6B' }}>experience.</em>
        </h2>
        <p style={{ fontSize: 15, color: '#6B6B6B', marginBottom: 36, marginTop: 16 }}>
          Available appointments daily. Book in under a minute.
        </p>
        <button
          onClick={() => setIsQuickBookingOpen(true)}
          className="btn btn-primary"
          style={{ padding: '15px 40px', fontSize: 14 }}
        >
          Book Appointment
        </button>
      </div>

      {/* Footer columns */}
      <div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}
          className="footer-grid"
        >

          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 20, fontWeight: 600,
                color: '#171717', marginBottom: 12,
                letterSpacing: '-0.01em',
              }}
            >
              Royal Salon
            </div>
            <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              A modern beauty studio in Beverly Hills. Hair, skin, makeup, and wellness — designed for you.
            </p>
            <div style={{ fontSize: 11, color: '#A0A0A0' }}>
              742 Royal Way, Beverly Hills, CA 90210
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Home',       id: 'home' },
                { label: 'Services',   id: 'services' },
                { label: 'About',      id: 'home' },
                { label: 'Gallery',    id: 'home' },
                { label: 'Contact',    id: 'home' },
              ].map(l => (
                <button
                  key={l.label}
                  onClick={() => go(l.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 13, color: '#6B6B6B', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#171717'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B6B6B'}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Hair & Cut', 'Balayage', 'Facial', 'Makeup', 'Nails', 'Grooming'].map(s => (
                <span key={s} style={{ fontSize: 13, color: '#6B6B6B' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Hours</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, color: '#171717', fontWeight: 600 }}>Mon – Sat</div>
                <div style={{ fontSize: 12, color: '#6B6B6B' }}>9:00 AM – 8:00 PM</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#171717', fontWeight: 600 }}>Sunday</div>
                <div style={{ fontSize: 12, color: '#6B6B6B' }}>10:00 AM – 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: '1px solid #E8E8E5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: '#A0A0A0' }}>
            © {new Date().getFullYear()} Royal Salon, Beverly Hills. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: '#A0A0A0' }}>
            Crafted for modern beauty.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};
