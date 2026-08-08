import React from 'react';

export const ServiceDetailModal = ({ service, onClose, onBookSelect }) => {
  if (!service) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(23,23,23,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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
          maxWidth: 680,
          width: '100%',
          boxShadow: '0 40px 120px rgba(0,0,0,0.2)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        className="anim-scale-in"
      >
        {/* Image */}
        <div style={{ height: 300, overflow: 'hidden', position: 'relative', background: '#F0F0ED' }}>
          <img
            src={service.image}
            alt={service.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 18, color: '#6B6B6B', lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 32px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, gap: 16 }}>
            <div>
              <span style={{ fontSize: 11, color: '#A0A0A0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
                {service.category} · {service.duration} min
              </span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#171717', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                {service.title}
              </h2>
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#171717', flexShrink: 0 }}>
              ${service.price}
            </div>
          </div>

          <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.75, marginBottom: 24 }}>
            {service.description}
          </p>

          {service.features && service.features.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>What's included</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {service.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#A8B5A2', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#6B6B6B' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 16, borderTop: '1px solid #F0F0ED', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(n => (
                <svg key={n} width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.2 2.5L10 4 8 6l.7 3L6 8 3.3 9 4 6 2 4l2.8-.5z" fill="#171717"/></svg>
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#171717' }}>{service.rating}</span>
            <span style={{ fontSize: 12, color: '#A0A0A0' }}>({service.reviewsCount} reviews)</span>
          </div>

          <button
            onClick={() => onBookSelect(service)}
            className="btn btn-primary"
            style={{ width: '100%', padding: '15px', fontSize: 14 }}
          >
            Book This Service
          </button>
        </div>
      </div>
    </div>
  );
};
