import React from 'react';
import { useSalon } from '../context/SalonContext';

export const Testimonials = () => {
  const { setIsQuickBookingOpen } = useSalon();

  const reviews = [
    {
      name: 'Genevieve Dupont',
      service: 'Botanical Facial',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      quote: 'The most relaxing, thoughtful facial I\'ve ever had. They listened to exactly what my skin needed and made me feel completely unhurried. I left glowing.',
    },
    {
      name: 'Marcus Lin',
      service: 'Signature Cut & Style',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      quote: 'I\'ve been to many high-end salons — Royal is different. The consultation actually matters here. My hair has never looked this good, and booking took 30 seconds.',
    },
    {
      name: 'Priya Mehra',
      service: 'Bridal Package',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      quote: 'For my wedding day, they were calm, precise, and absolutely brilliant. My makeup lasted 12 hours and I still get compliments from the photos.',
    },
  ];

  return (
    <section
      style={{ background: '#fff', paddingTop: 120, paddingBottom: 120 }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Heading */}
        <div style={{ marginBottom: 64, maxWidth: 500 }} className="reveal">
          <span className="eyebrow">Client Stories</span>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              fontWeight: 600, color: '#171717',
              lineHeight: 1.1, letterSpacing: '-0.02em',
            }}
          >
            Trusted by<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: '#A8B5A2' }}>thousands.</em>
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          className="testimonials-grid"
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`card reveal delay-${i + 1}`}
              style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20, borderRadius: 20 }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(n => (
                  <svg key={n} width="12" height="12" viewBox="0 0 12 12">
                    <path d="M6 1L7.5 4H11L8 6.5l1 3L6 8 3 9.5l1-3L1 4h3.5z" fill="#171717"/>
                  </svg>
                ))}
              </div>

              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.75, fontStyle: 'italic', flex: 1, margin: 0 }}>
                "{r.quote}"
              </p>

              {/* Client */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid #F0F0ED' }}>
                <img
                  src={r.avatar}
                  alt={r.name}
                  style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #F0F0ED' }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#171717', lineHeight: 1.3 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: '#A0A0A0', marginTop: 2 }}>{r.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          style={{
            marginTop: 80,
            background: '#171717',
            borderRadius: 24,
            padding: '56px 60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
          className="cta-strip reveal delay-1"
        >
          <div>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                fontWeight: 600, color: '#fff',
                lineHeight: 1.15, letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              Your appointment<br />is waiting.
            </h3>
            <p style={{ color: '#A0A0A0', fontSize: 14, margin: 0 }}>
              Book in under 60 seconds. No waiting rooms.
            </p>
          </div>
          <button
            onClick={() => setIsQuickBookingOpen(true)}
            style={{
              background: '#fff',
              color: '#111',
              padding: '16px 36px',
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F7F7F5'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Book Appointment
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .cta-strip { padding: 40px 28px !important; }
        }
      `}</style>
    </section>
  );
};
