import React from 'react';
import { useSalon } from '../context/SalonContext';

export const SalonExperience = () => {
  const { setIsQuickBookingOpen } = useSalon();

  return (
    <section
      id="about"
      style={{ background: '#fff', paddingTop: 140, paddingBottom: 140 }}
    >
      <div
        style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}
      >
        {/* Large editorial heading */}
        <div style={{ marginBottom: 80 }} className="reveal">
          <span className="eyebrow">Our Philosophy</span>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(42px, 6vw, 80px)',
              fontWeight: 600,
              color: '#171717',
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              maxWidth: 720,
            }}
          >
            Beauty should<br />
            <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#A8B5A2' }}>feel personal.</em>
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: 60,
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left: large photo */}
          <div
            className="reveal delay-1"
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              height: 580,
              position: 'relative',
            }}
          >
            <img
              src="/images/salon_facial.jpg"
              alt="Royal Salon treatment experience"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Floating glass stat */}
            <div
              style={{
                position: 'absolute',
                bottom: 28,
                right: -20,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid #E8E8E5',
                borderRadius: 20,
                padding: '24px 28px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                width: 220,
              }}
            >
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#171717', lineHeight: 1, marginBottom: 8 }}>
                10+
              </div>
              <div style={{ fontSize: 12, color: '#6B6B6B', lineHeight: 1.5 }}>
                Years perfecting personalized beauty experiences in Beverly Hills
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div style={{ paddingLeft: 16 }} className="reveal delay-2">
            <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.8, marginBottom: 48 }}>
              We believe great beauty isn't about trends — it's about you. Every visit to Royal Salon begins with listening: to your lifestyle, your preferences, your vision. From there, our specialists craft an experience that's entirely yours.
            </p>

            {/* Numbered pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[
                {
                  n: '01',
                  title: 'Personalized Consultation',
                  desc: 'Every appointment begins with a focused conversation about your goals, not a template.',
                },
                {
                  n: '02',
                  title: 'Premium Organic Formulas',
                  desc: 'We use only certified organic botanical products — kind to your skin, hair, and the planet.',
                },
                {
                  n: '03',
                  title: 'Private, Unhurried Time',
                  desc: 'No back-to-back rushing. Your slot is yours completely — zero wait, zero pressure.',
                },
              ].map(p => (
                <div key={p.n} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 36,
                      fontWeight: 700,
                      color: '#E8E8E5',
                      lineHeight: 1,
                      flexShrink: 0,
                      minWidth: 48,
                    }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#171717',
                        marginBottom: 6,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65, margin: 0 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsQuickBookingOpen(true)}
              className="btn btn-primary"
              style={{ marginTop: 48, padding: '14px 32px', fontSize: 13 }}
            >
              Book Your Experience
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
