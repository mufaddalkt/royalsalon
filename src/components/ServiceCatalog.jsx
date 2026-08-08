import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { ServiceDetailModal } from './ServiceDetailModal';

const catImages = {
  Hair:     '/images/salon_hair.jpg',
  Facial:   '/images/salon_facial.jpg',
  Nails:    '/images/salon_nails.jpg',
  Styling:  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
  Makeup:   'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
  Grooming: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
};

const cats = ['All', 'Hair', 'Styling', 'Facial', 'Makeup', 'Nails', 'Grooming'];

export const ServiceCatalog = () => {
  const { services, setSelectedServiceForBooking, setIsQuickBookingOpen } = useSalon();
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [detailService, setDetailService] = useState(null);

  const filtered = services.filter(s => {
    const matchCat  = activeCat === 'All' || s.category === activeCat;
    const matchSrch = s.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrch;
  });

  const book = (srv) => {
    setSelectedServiceForBooking(srv);
    setIsQuickBookingOpen(true);
  };

  return (
    <section
      id="services"
      style={{
        background: '#F7F7F5',
        paddingTop: 120,
        paddingBottom: 140,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Section heading */}
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">Our Services</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 600,
                color: '#171717',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              Every service,<br />
              <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#6B6B6B' }}>crafted for you.</em>
            </h2>

            {/* Search */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <svg
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                className="input-clean"
                style={{ paddingLeft: 38, width: 240, borderRadius: 99, fontSize: 13 }}
                placeholder="Search treatments…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 52, paddingBottom: 4 }} className="no-scrollbar">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              style={{
                padding: '9px 22px',
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 500,
                border: '1px solid',
                borderColor: activeCat === c ? '#111' : '#E8E8E5',
                background: activeCat === c ? '#111' : '#fff',
                color: activeCat === c ? '#fff' : '#6B6B6B',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 2-column editorial card grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#A0A0A0', fontSize: 15 }}>
            No treatments match your search.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 28,
            }}
            className="services-grid"
          >
            {filtered.map((srv, i) => {
              const imgSrc = catImages[srv.category] || srv.image;
              return (
                <article
                  key={srv.id}
                  className="card card-hover"
                  style={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 24,
                  }}
                  onClick={() => setDetailService(srv)}
                >
                  {/* Card image */}
                  <div style={{ height: 280, overflow: 'hidden', position: 'relative', background: '#F0F0ED' }}>
                    <img
                      src={imgSrc}
                      alt={srv.title}
                      className="img-zoom"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Category pill */}
                    <span
                      style={{
                        position: 'absolute', top: 16, left: 16,
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        borderRadius: 99, padding: '5px 12px',
                        fontSize: 11, fontWeight: 600, color: '#6B6B6B',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      {srv.category}
                    </span>
                    {srv.popular && (
                      <span
                        style={{
                          position: 'absolute', top: 16, right: 16,
                          background: '#111', color: '#fff',
                          borderRadius: 99, padding: '5px 12px',
                          fontSize: 10, fontWeight: 700,
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 22,
                        fontWeight: 600,
                        color: '#171717',
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {srv.title}
                    </h3>

                    <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65, margin: 0, flex: 1 }}>
                      {srv.description}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: 16, borderTop: '1px solid #F0F0ED', marginTop: 4,
                      }}
                    >
                      <div>
                        <span style={{ fontSize: 11, color: '#A0A0A0', fontWeight: 500, display: 'block', marginBottom: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {srv.duration} min
                        </span>
                        <span
                          style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 26,
                            fontWeight: 600,
                            color: '#171717',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          ${srv.price}
                        </span>
                      </div>

                      <button
                        onClick={e => { e.stopPropagation(); book(srv); }}
                        className="btn btn-primary"
                        style={{ padding: '10px 22px', fontSize: 12 }}
                      >
                        Book →
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Service detail modal */}
      {detailService && (
        <ServiceDetailModal
          service={detailService}
          onClose={() => setDetailService(null)}
          onBookSelect={srv => { setDetailService(null); book(srv); }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
