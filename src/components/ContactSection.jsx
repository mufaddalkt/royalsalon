import React, { useState } from 'react';

export const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      style={{ background: '#F7F7F5', paddingTop: 120, paddingBottom: 120 }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}
          className="contact-grid"
        >

          {/* Left — Info */}
          <div className="reveal">
            <span className="eyebrow">Get in Touch</span>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(32px, 4.5vw, 54px)',
                fontWeight: 600, color: '#171717',
                lineHeight: 1.1, letterSpacing: '-0.02em',
                marginBottom: 32,
              }}
            >
              Visit us in<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: '#6B6B6B' }}>Beverly Hills.</em>
            </h2>

            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.8, marginBottom: 48, maxWidth: 380 }}>
              Come see us at our quiet studio on Royal Way. No loud music, no chaos — just calm, focused attention for you.
            </p>

            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ),
                label: 'Address',
                value: '742 Royal Way, Beverly Hills, CA 90210',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="1.5"><path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 013.1 4.2 2 2 0 015.1 2h3a2 2 0 012 1.7 12.8 12.8 0 00.7 2.8 2 2 0 01-.5 2.1L9.1 9.9a16 16 0 006.9 6.9l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.5 2.8.7a2 2 0 011.7 2z"/></svg>
                ),
                label: 'Phone',
                value: '+1 (800) 795-7625',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                ),
                label: 'Email',
                value: 'hello@royalsalon.com',
              },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 28 }}>
                <div style={{
                  width: 40, height: 40,
                  background: '#fff', borderRadius: 12,
                  border: '1px solid #E8E8E5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: '#171717', lineHeight: 1.5 }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div style={{ marginTop: 40, padding: '24px 28px', background: '#fff', borderRadius: 16, border: '1px solid #E8E8E5' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#A0A0A0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Opening Hours</div>
              {[
                { days: 'Monday – Saturday', hours: '9:00 AM – 8:00 PM' },
                { days: 'Sunday',            hours: '10:00 AM – 6:00 PM' },
              ].map(h => (
                <div key={h.days} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F0F0ED' }}>
                  <span style={{ fontSize: 13, color: '#6B6B6B' }}>{h.days}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#171717' }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="reveal delay-1">
            <div style={{ background: '#fff', borderRadius: 24, padding: '40px 36px', border: '1px solid #E8E8E5', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 24, fontWeight: 600,
                  color: '#171717', marginBottom: 8,
                }}
              >
                Send a message
              </h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 28 }}>
                Questions, special requests, or group bookings — we'll reply within a few hours.
              </p>

              {sent ? (
                <div style={{ padding: '20px 24px', background: '#F2F5F1', borderRadius: 12, border: '1px solid #DCE4DA', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#171717', marginBottom: 4 }}>Message received ✓</div>
                  <div style={{ fontSize: 13, color: '#6B6B6B' }}>We'll be in touch shortly.</div>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Your Name</label>
                    <input
                      className="input-clean"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email Address</label>
                    <input
                      className="input-clean"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Message</label>
                    <textarea
                      className="input-clean"
                      required
                      rows={5}
                      placeholder="Tell us how we can help…"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: '14px', width: '100%', marginTop: 4, fontSize: 13 }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};
