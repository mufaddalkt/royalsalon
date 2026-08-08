import React, { useEffect, useRef } from 'react';
import { useSalon } from '../context/SalonContext';

export const Hero = () => {
  const { setActiveTab, setIsQuickBookingOpen } = useSalon();
  const imgRef = useRef(null);

  useEffect(() => {
    // Subtle ken-burns on hero image
    const el = imgRef.current;
    if (!el) return;
    el.style.transform = 'scale(1.06)';
    el.style.transition = 'transform 8s ease-out';
    const t = setTimeout(() => { el.style.transform = 'scale(1)'; }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      style={{ background: '#F7F7F5', minHeight: '100vh', paddingTop: 100 }}
    >
      {/* Main editorial split */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
          minHeight: 'calc(100vh - 100px)',
        }}
        className="hero-grid"
      >
        {/* Left — large editorial image */}
        <div
          style={{
            borderRadius: 28,
            overflow: 'hidden',
            height: 'clamp(480px, 72vh, 760px)',
            position: 'relative',
          }}
          className="anim-fade-in"
        >
          <img
            ref={imgRef}
            src="/images/salon_hero.jpg"
            alt="Royal Salon — minimalist beauty studio"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          {/* Very subtle bottom gradient */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to top, rgba(247,247,245,0.5), transparent)' }} />
          {/* Small floating badge */}
          <div
            style={{
              position: 'absolute', bottom: 24, left: 24,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.9)',
              borderRadius: 14,
              padding: '12px 18px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="10" height="10" viewBox="0 0 10 10">
                  <path d="M5 1l1.2 2.5L9 4l-2 1.9.5 2.6L5 7.3 2.5 8.5l.5-2.6L1 4l2.8-.5z" fill="#111"/>
                </svg>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#171717', lineHeight: 1.2 }}>4.98 rating</div>
              <div style={{ fontSize: 10, color: '#6B6B6B', lineHeight: 1.2 }}>2,400+ reviews</div>
            </div>
          </div>
        </div>

        {/* Right — text content */}
        <div style={{ paddingLeft: 16 }}>
          <span
            className="eyebrow anim-fade-up"
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
            Beverly Hills · Est. 2014
          </span>

          <h1
            className="anim-fade-up delay-1"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(52px, 6vw, 88px)',
              fontWeight: 700,
              lineHeight: 1.02,
              color: '#171717',
              letterSpacing: '-0.02em',
              marginBottom: 24,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            Beauty,<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#6B6B6B' }}>simplified.</em>
          </h1>

          <p
            className="anim-fade-up delay-2"
            style={{
              fontSize: 16,
              color: '#6B6B6B',
              lineHeight: 1.7,
              maxWidth: 400,
              marginBottom: 40,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            Hair, skin, makeup and wellness experiences designed around your schedule, your style, and your time. Book in under a minute.
          </p>

          <div
            className="anim-fade-up delay-3"
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', opacity: 0, animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => setIsQuickBookingOpen(true)}
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: 13 }}
            >
              Book Appointment
            </button>
            <button
              onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0 }); }}
              className="btn btn-secondary"
              style={{ padding: '14px 32px', fontSize: 13 }}
            >
              Explore Services
            </button>
          </div>

          {/* Mini stats strip */}
          <div
            className="anim-fade-up delay-4"
            style={{
              display: 'flex', gap: 32, marginTop: 56,
              opacity: 0, animationFillMode: 'forwards',
            }}
          >
            {[
              { value: '50+',  label: 'Treatments' },
              { value: '10+',  label: 'Years' },
              { value: '100%', label: 'Satisfaction' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#171717', lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#A0A0A0', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 0 20px 40px !important;
            gap: 32px !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
