import React from 'react';

export const Toast = ({ toasts = [], onRemove }) => {
  if (!toasts || toasts.length === 0) return null;

  const colors = {
    success: { bg: '#F0F7F0', border: '#A8B5A2', text: '#2D4A2D' },
    error:   { bg: '#FFF5F5', border: '#FFCDD2', text: '#C62828' },
    info:    { bg: '#F7F7F5', border: '#E8E8E5', text: '#171717' },
  };

  return (
    <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, width: '100%', pointerEvents: 'none' }}>
      {toasts.map(toast => {
        const c = colors[toast.type] || colors.info;
        return (
          <div
            key={toast.id}
            className="anim-slide-down"
            style={{
              pointerEvents: 'auto',
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: 14,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, color: c.text, lineHeight: 1.4 }}>
              {toast.message}
            </span>
            <button
              onClick={() => onRemove(toast.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: c.text, opacity: 0.5, flexShrink: 0, fontSize: 16, lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
