import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';

const STATUS_COLORS = {
  Confirmed:  { bg: '#EEF4FF', text: '#1A47A0', dot: '#3B82F6' },
  Pending:    { bg: '#FFFBEB', text: '#92400E', dot: '#F59E0B' },
  Completed:  { bg: '#F0FDF4', text: '#15533A', dot: '#22C55E' },
  Cancelled:  { bg: '#FEF2F2', text: '#991B1B', dot: '#EF4444' },
};

export const LookupSection = () => {
  const { appointments, cancelBooking, rescheduleBooking, getAvailableSlots, isDateClosed } = useSalon();
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState([]);
  const [rescheduling, setRescheduling] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [rescheduleError, setRescheduleError] = useState('');
  const [cancelling, setCancelling] = useState(null);

  const search = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const t = searchTerm.trim().toLowerCase();
    const results = appointments.filter(a =>
      a.id.toLowerCase().includes(t) ||
      a.customerPhone.toLowerCase().includes(t) ||
      a.customerEmail.toLowerCase().includes(t) ||
      a.customerName.toLowerCase().includes(t)
    );
    setFound(results);
    setSearched(true);
  };

  const slots = rescheduling && newDate ? getAvailableSlots(newDate, rescheduling.duration) : [];

  const handleReschedule = () => {
    if (!newDate || !newTime) { setRescheduleError('Please select a date and time.'); return; }
    if (isDateClosed(newDate)) { setRescheduleError('Salon is closed on this date.'); return; }
    const res = rescheduleBooking(rescheduling.id, newDate, newTime);
    if (res.success) {
      setFound(prev => prev.map(a => a.id === rescheduling.id ? { ...a, date: newDate, time: newTime, status: 'Confirmed' } : a));
      setRescheduling(null); setNewDate(''); setNewTime(''); setRescheduleError('');
    } else {
      setRescheduleError(res.message);
    }
  };

  const handleCancel = () => {
    cancelBooking(cancelling.id);
    setFound(prev => prev.map(a => a.id === cancelling.id ? { ...a, status: 'Cancelled' } : a));
    setCancelling(null);
  };

  const inp = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    border: '1px solid #E8E8E5', background: '#F7F7F5',
    fontSize: 14, color: '#171717', outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <div style={{ background: '#F7F7F5', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48, paddingTop: 60 }}>
          <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>Booking Lookup</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, color: '#171717', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Find your appointment.
          </h1>
          <p style={{ fontSize: 14, color: '#6B6B6B', marginTop: 12 }}>
            Search by reference ID, name, email, or phone number.
          </p>
        </div>

        {/* Search box */}
        <form onSubmit={search} style={{ background: '#fff', borderRadius: 20, padding: '24px 28px', border: '1px solid #E8E8E5', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.35 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input style={{ ...inp, paddingLeft: 40 }} placeholder="RS-1234 · name · email · phone…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', flexShrink: 0, fontSize: 13 }}>Search</button>
          </div>
        </form>

        {/* Results */}
        {searched && (
          found.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 20, padding: '48px', textAlign: 'center', border: '1px solid #E8E8E5' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: '#171717', marginBottom: 6 }}>No bookings found</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B' }}>Check your reference ID, name, email, or phone number and try again.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {found.map(apt => {
                const sc = STATUS_COLORS[apt.status] || STATUS_COLORS.Pending;
                const canAction = apt.status !== 'Cancelled' && apt.status !== 'Completed';
                return (
                  <div key={apt.id} style={{ background: '#fff', borderRadius: 20, padding: '24px 28px', border: '1px solid #E8E8E5', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: 11, color: '#A0A0A0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Reference</div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#171717' }}>{apt.id}</div>
                      </div>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 99,
                        background: sc.bg, color: sc.text, fontSize: 12, fontWeight: 600,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
                        {apt.status}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="lookup-cols">
                      {[
                        { k: 'Service',   v: apt.serviceTitle },
                        { k: 'Date',      v: apt.date },
                        { k: 'Time',      v: apt.time },
                        { k: 'Guest',     v: apt.customerName },
                        { k: 'Phone',     v: apt.customerPhone },
                        { k: 'Email',     v: apt.customerEmail },
                        { k: 'Total',     v: `$${apt.price}` },
                      ].map(row => (
                        <div key={row.k} style={{ background: '#F7F7F5', borderRadius: 10, padding: '10px 14px' }}>
                          <div style={{ fontSize: 10, color: '#A0A0A0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>{row.k}</div>
                          <div style={{ fontSize: 13, color: '#171717', fontWeight: 600, wordBreak: 'break-all' }}>{row.v}</div>
                        </div>
                      ))}
                    </div>

                    {canAction && (
                      <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid #F0F0ED' }}>
                        <button onClick={() => { setRescheduling(apt); setNewDate(''); setNewTime(''); setRescheduleError(''); }}
                          className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: 12, flex: 1 }}>
                          Reschedule
                        </button>
                        <button onClick={() => setCancelling(apt)}
                          style={{ flex: 1, padding: '10px 20px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: '#FEF2F2', color: '#C62828', border: '1px solid #FFCDD2', cursor: 'pointer', transition: 'all 0.2s' }}>
                          Cancel Appointment
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduling && (
        <div onClick={() => setRescheduling(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(23,23,23,0.5)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} className="anim-fade-in">
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 24, padding: '36px 32px', maxWidth: 520, width: '100%', boxShadow: '0 40px 100px rgba(0,0,0,0.2)' }} className="anim-scale-in">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#171717', marginBottom: 6 }}>Reschedule Appointment</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>{rescheduling.id} — {rescheduling.serviceTitle}</p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>New Date</label>
              <input type="date" value={newDate} min={new Date().toISOString().split('T')[0]} onChange={e => { setNewDate(e.target.value); setNewTime(''); }} style={inp} />
            </div>

            {newDate && !isDateClosed(newDate) && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>New Time</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, maxHeight: 200, overflowY: 'auto' }}>
                  {slots.map((s, i) => (
                    <button key={i} disabled={!s.available} onClick={() => setNewTime(s.time)} style={{
                      padding: '9px 4px', borderRadius: 10, border: '1.5px solid', fontSize: 11, fontWeight: 600,
                      cursor: s.available ? 'pointer' : 'not-allowed',
                      borderColor: newTime === s.time ? '#111' : s.available ? '#E8E8E5' : '#F0F0ED',
                      background: newTime === s.time ? '#111' : s.available ? '#F7F7F5' : '#FAFAFA',
                      color: newTime === s.time ? '#fff' : s.available ? '#171717' : '#C0C0BB',
                      textDecoration: !s.available ? 'line-through' : 'none',
                    }}>{s.time}</button>
                  ))}
                </div>
              </div>
            )}

            {rescheduleError && <div style={{ fontSize: 13, color: '#C62828', padding: '10px 14px', background: '#FFF5F5', borderRadius: 10, border: '1px solid #FFCDD2', marginBottom: 16 }}>{rescheduleError}</div>}

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setRescheduling(null)} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>Cancel</button>
              <button onClick={handleReschedule} className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>Confirm Reschedule</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirm Modal */}
      {cancelling && (
        <div onClick={() => setCancelling(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(23,23,23,0.5)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} className="anim-fade-in">
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 24, padding: '36px 32px', maxWidth: 440, width: '100%', boxShadow: '0 40px 100px rgba(0,0,0,0.2)', textAlign: 'center' }} className="anim-scale-in">
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#FEF2F2', border: '1px solid #FFCDD2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="#C62828" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#171717', marginBottom: 8 }}>Cancel Appointment?</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 28 }}>
              Appointment <strong>{cancelling.id}</strong> ({cancelling.serviceTitle}) on {cancelling.date} at {cancelling.time} will be permanently cancelled.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setCancelling(null)} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>Keep It</button>
              <button onClick={handleCancel} style={{ flex: 1, padding: '12px 24px', borderRadius: 99, fontSize: 13, fontWeight: 700, background: '#C62828', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@media(max-width:600px){.lookup-cols{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};
