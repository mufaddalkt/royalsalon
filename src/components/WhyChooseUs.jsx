import React from 'react';

const pillars = [
  {
    icon: '◎',
    title: 'Personal from the Start',
    desc: 'Your appointment begins with a focused consultation — not a clipboard. We listen to your goals, your hair, your skin.',
  },
  {
    icon: '⊕',
    title: 'Clean Formulations',
    desc: 'We exclusively use certified organic, cruelty-free products. Effective without compromise.',
  },
  {
    icon: '◷',
    title: 'No Rushing, Ever',
    desc: 'Each slot is yours completely. No back-to-back chairs, no shortcuts. Just you and your specialist.',
  },
  {
    icon: '✦',
    title: 'Transparent Pricing',
    desc: 'Every service has a fixed price listed upfront. No surprises, no add-ons you didn\'t choose.',
  },
  {
    icon: '◐',
    title: 'Private Quiet Studio',
    desc: 'A calm, clean, minimalist space. The opposite of a busy chain salon.',
  },
  {
    icon: '◴',
    title: 'Easy Online Booking',
    desc: 'Reserve your appointment in under a minute, 24/7, with instant confirmation.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section style={{ background: '#fff', paddingTop: 120, paddingBottom: 120 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start' }} className="why-grid">

          {/* Left: sticky heading */}
          <div style={{ position: 'sticky', top: 120 }}>
            <span className="eyebrow">Why Royal Salon</span>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 600, color: '#171717',
                lineHeight: 1.08, letterSpacing: '-0.02em',
                marginBottom: 24,
              }}
            >
              Designed for<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#A8B5A2' }}>the discerning.</em>
            </h2>
            <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, maxWidth: 340 }}>
              We built Royal Salon around one belief: you deserve an experience that centres completely on you — not on throughput.
            </p>

            {/* Divider with small number */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
              <div style={{ height: 1, flex: 1, background: '#E8E8E5' }} />
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, color: '#A0A0A0', fontWeight: 400 }}>6 reasons</span>
            </div>
          </div>

          {/* Right: pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {pillars.map((p, i) => (
              <div
                key={p.title}
                style={{
                  display: 'flex', gap: 20, padding: '28px 0',
                  borderBottom: i < pillars.length - 1 ? '1px solid #F0F0ED' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 20, color: '#A8B5A2', marginTop: 2, flexShrink: 0, minWidth: 24 }}>{p.icon}</span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 17, fontWeight: 600, color: '#171717',
                      marginBottom: 8, lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.7, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};
