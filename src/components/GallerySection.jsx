import React, { useState } from 'react';

const ITEMS = [
  { id: 1, cat: 'Hair',    label: 'Signature Cut',          img: '/images/salon_hair.jpg',        aspect: 'tall' },
  { id: 2, cat: 'Skin',    label: 'Botanical Facial',       img: '/images/salon_facial.jpg',      aspect: 'wide' },
  { id: 3, cat: 'Nails',   label: 'Minimalist Manicure',    img: '/images/salon_nails.jpg',       aspect: 'square' },
  { id: 4, cat: 'Studio',  label: 'Our Beverly Hills Space', img: '/images/salon_hero.jpg',       aspect: 'wide' },
  { id: 5, cat: 'Hair',    label: 'Balayage & Gloss',       img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', aspect: 'square' },
  { id: 6, cat: 'Makeup',  label: 'Editorial Makeup',       img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', aspect: 'tall' },
];

const CATS = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Studio'];

const heights = { tall: 400, wide: 260, square: 320 };

export const GallerySection = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [hovered, setHovered] = useState(null);

  const shown = ITEMS.filter(i => activeCat === 'All' || i.cat === activeCat);

  return (
    <section
      id="gallery"
      style={{ background: '#F7F7F5', paddingTop: 120, paddingBottom: 120 }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Heading */}
        <div style={{ marginBottom: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="eyebrow">Gallery</span>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 600, color: '#171717',
                lineHeight: 1.1, letterSpacing: '-0.02em',
              }}
            >
              The work<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: '#6B6B6B' }}>speaks for itself.</em>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                style={{
                  padding: '8px 18px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                  border: '1px solid', cursor: 'pointer',
                  borderColor: activeCat === c ? '#111' : '#E8E8E5',
                  background: activeCat === c ? '#111' : '#fff',
                  color: activeCat === c ? '#fff' : '#6B6B6B',
                  transition: 'all 0.2s',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
          className="gallery-grid"
        >
          {shown.map(item => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                height: heights[item.aspect],
                position: 'relative',
                cursor: 'zoom-in',
                background: '#E8E8E5',
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                  transform: hovered === item.id ? 'scale(1.06)' : 'scale(1)',
                }}
              />
              {/* Overlay */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(23,23,23,0)',
                  transition: 'background 0.3s',
                  ...(hovered === item.id ? { background: 'rgba(23,23,23,0.35)' } : {}),
                  display: 'flex', alignItems: 'flex-end', padding: 20,
                }}
              >
                <div
                  style={{
                    opacity: hovered === item.id ? 1 : 0,
                    transform: hovered === item.id ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'all 0.3s',
                  }}
                >
                  <span style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    borderRadius: 99, padding: '4px 12px',
                    fontSize: 10, fontWeight: 600, color: '#fff',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    border: '1px solid rgba(255,255,255,0.3)',
                    display: 'block', marginBottom: 6,
                  }}>
                    {item.cat}
                  </span>
                  <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'Playfair Display, serif', margin: 0 }}>
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(23,23,23,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
          className="anim-fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 24,
              overflow: 'hidden',
              maxWidth: 860,
              width: '100%',
              boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
            }}
            className="anim-scale-in"
          >
            <img
              src={lightbox.img}
              alt={lightbox.label}
              style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{lightbox.cat}</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: '#171717', margin: 0 }}>{lightbox.label}</h3>
              </div>
              <button onClick={() => setLightbox(null)} className="btn btn-secondary" style={{ padding: '9px 20px', fontSize: 12 }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
