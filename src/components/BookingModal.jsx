import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';
import confetti from 'canvas-confetti';

const STEPS = ['Service', 'Date', 'Time', 'Details', 'Confirm'];

export const BookingModal = ({ isOverlayMode = false, onCloseOverlay = null }) => {
  const {
    services,
    selectedServiceForBooking,
    setSelectedServiceForBooking,
    getAvailableSlots,
    isDateClosed,
    addBooking,
    activeBookingResult,
    setActiveBookingResult,
    addToast,
  } = useSalon();

  const [step, setStep] = useState(1);
  const [catFilter, setCatFilter] = useState('All');
  const [chosenService, setChosenService] = useState(null);
  const [chosenDate, setChosenDate] = useState(new Date().toISOString().split('T')[0]);
  const [chosenTime, setChosenTime] = useState('');
  const [periodFilter, setPeriodFilter] = useState('All');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const cats = ['All', 'Hair', 'Styling', 'Facial', 'Makeup', 'Nails', 'Grooming'];
  const periods = ['All', 'Morning', 'Afternoon', 'Evening'];

  const next7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      str: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      num: d.getDate(),
      mon: d.toLocaleDateString('en-US', { month: 'short' }),
      today: i === 0,
    };
  });

  useEffect(() => {
    if (selectedServiceForBooking) {
      setChosenService(selectedServiceForBooking);
      setStep(2);
    } else if (services.length && !chosenService) {
      setChosenService(services[0]);
    }
  }, [selectedServiceForBooking, services]);

  const slots = chosenService ? getAvailableSlots(chosenDate, chosenService.duration) : [];
  const filteredSlots = slots.filter(s => periodFilter === 'All' || s.period === periodFilter);
  const filteredServices = services.filter(s => catFilter === 'All' || s.category === catFilter);
  const isClosed = isDateClosed(chosenDate);

  const reset = () => {
    setStep(1); setSelectedServiceForBooking(null);
    setActiveBookingResult(null); setChosenTime('');
    setName(''); setEmail(''); setPhone(''); setNotes('');
    setError('');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) { setError('Please complete all required fields.'); return; }
    setError('');
    addBooking({ serviceId: chosenService.id, date: chosenDate, time: chosenTime, customerName: name.trim(), customerEmail: email.trim(), customerPhone: phone.trim(), notes: notes.trim() });
    try { confetti({ particleCount: 80, spread: 70, colors: ['#111', '#A8B5A2', '#FFFFFF'] }); } catch {}
    setStep(5);
  };

  const copyRef = (id) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    addToast(`Reference ${id} copied!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadIcs = (apt) => {
    const start = apt.date.replace(/-/g, '') + 'T' + apt.time.replace(':', '') + '00';
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Royal Salon — ${apt.serviceTitle}\nDESCRIPTION:Ref: ${apt.id}\nLOCATION:742 Royal Way, Beverly Hills, CA 90210\nDTSTART:${start}\nEND:VEVENT\nEND:VCALENDAR`;
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })), download: `RoyalSalon_${apt.id}.ics` });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    addToast('Calendar file downloaded', 'success');
  };

  /* shared input style */
  const inp = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    border: '1px solid #E8E8E5', background: '#F7F7F5',
    fontSize: 14, color: '#171717', outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
    transition: 'border-color 0.2s',
  };
  const label = { fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 };

  return (
    <div style={{ background: '#F7F7F5', minHeight: isOverlayMode ? 'auto' : '100vh', padding: isOverlayMode ? 0 : '40px 24px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        {!isOverlayMode && (
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Online Booking</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, color: '#171717', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Reserve your time.
            </h1>
          </div>
        )}

        {/* Step Progress */}
        <div
          style={{
            background: '#fff', borderRadius: 20, padding: '24px 28px',
            border: '1px solid #E8E8E5', marginBottom: 24,
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          {isOverlayMode && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: '#171717' }}>Reserve your time.</div>
              <button onClick={onCloseOverlay} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A0A0A0', fontSize: 22, lineHeight: 1 }}>×</button>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            {STEPS.map((s, i) => (
              <div
                key={s}
                style={{ flex: 1, height: 3, borderRadius: 99,
                  background: step > i + 1 ? '#111' : step === i + 1 ? '#A8B5A2' : '#E8E8E5',
                  transition: 'background 0.4s' }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ flex: 1, fontSize: 10, color: step === i + 1 ? '#171717' : '#A0A0A0', fontWeight: step === i + 1 ? 700 : 400, textAlign: 'center', transition: 'color 0.3s' }}>
                {String(i + 1).padStart(2, '0')} {s}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content Card */}
        <div
          className="anim-scale-in"
          key={step}
          style={{ background: '#fff', borderRadius: 24, padding: '36px 32px', border: '1px solid #E8E8E5', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
        >

          {/* ── STEP 1: SELECT SERVICE ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#171717', marginBottom: 6 }}>Choose a service</h2>
              <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>Select the treatment you'd like to book.</p>

              {/* Cat filter */}
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 20, paddingBottom: 2 }} className="no-scrollbar">
                {cats.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} style={{
                    padding: '7px 16px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                    border: '1px solid', flexShrink: 0, cursor: 'pointer',
                    borderColor: catFilter === c ? '#111' : '#E8E8E5',
                    background: catFilter === c ? '#111' : '#F7F7F5',
                    color: catFilter === c ? '#fff' : '#6B6B6B', transition: 'all 0.2s',
                  }}>{c}</button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 400, overflowY: 'auto' }} className="no-scrollbar">
                {filteredServices.map(srv => (
                  <div key={srv.id} onClick={() => setChosenService(srv)} style={{
                    display: 'flex', gap: 16, alignItems: 'center', padding: '16px 16px',
                    borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s',
                    border: '1.5px solid', borderColor: chosenService?.id === srv.id ? '#111' : '#E8E8E5',
                    background: chosenService?.id === srv.id ? '#F7F7F5' : '#fff',
                  }}>
                    <img src={srv.image} alt={srv.title} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: '#A0A0A0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>{srv.category}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#171717', fontFamily: 'Playfair Display, serif' }}>{srv.title}</div>
                      <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 2 }}>{srv.duration} min · ${srv.price}</div>
                    </div>
                    {chosenService?.id === srv.id && (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F0F0ED' }}>
                <button onClick={() => setStep(2)} className="btn btn-primary" style={{ padding: '13px 28px' }}>
                  Next: Choose Date →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: SELECT DATE ── */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#171717', marginBottom: 6 }}>Choose a date</h2>
              <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>Select your preferred appointment day.</p>

              {/* 7-day strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 20 }}>
                {next7.map(d => {
                  const closed = isDateClosed(d.str);
                  const sel = chosenDate === d.str;
                  return (
                    <button key={d.str} onClick={() => { setChosenDate(d.str); setChosenTime(''); }}
                      style={{
                        padding: '10px 4px', borderRadius: 14, border: '1.5px solid',
                        cursor: closed ? 'not-allowed' : 'pointer',
                        borderColor: sel ? '#111' : '#E8E8E5',
                        background: sel ? '#111' : '#F7F7F5',
                        color: sel ? '#fff' : closed ? '#C0C0BB' : '#171717',
                        textAlign: 'center', transition: 'all 0.2s',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                      }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.day}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{d.num}</span>
                      <span style={{ fontSize: 9 }}>{d.mon}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#F7F7F5', borderRadius: 12, padding: '12px 16px', border: '1px solid #E8E8E5' }}>
                <span style={{ fontSize: 12, color: '#6B6B6B' }}>Custom date:</span>
                <input type="date" value={chosenDate} min={new Date().toISOString().split('T')[0]}
                  onChange={e => { setChosenDate(e.target.value); setChosenTime(''); }}
                  style={{ background: 'none', border: 'none', fontSize: 13, color: '#171717', outline: 'none', cursor: 'pointer' }}
                />
              </div>

              {isClosed && (
                <div style={{ padding: '12px 16px', borderRadius: 12, background: '#FFF5F5', border: '1px solid #FFCDD2', color: '#C62828', fontSize: 13, marginTop: 16 }}>
                  Salon is closed on this date. Please choose another day.
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F0F0ED' }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ padding: '12px 24px' }}>← Back</button>
                <button onClick={() => { if (isClosed) return; setStep(3); }} disabled={isClosed} className="btn btn-primary" style={{ padding: '13px 28px', opacity: isClosed ? 0.4 : 1 }}>
                  Next: Choose Time →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: SELECT TIME ── */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 12 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#171717' }}>Choose a time</h2>
                <div style={{ display: 'flex', gap: 6 }}>
                  {periods.map(p => (
                    <button key={p} onClick={() => setPeriodFilter(p)} style={{
                      padding: '6px 14px', borderRadius: 99, fontSize: 11, fontWeight: 500,
                      border: '1px solid', cursor: 'pointer',
                      borderColor: periodFilter === p ? '#111' : '#E8E8E5',
                      background: periodFilter === p ? '#111' : '#F7F7F5',
                      color: periodFilter === p ? '#fff' : '#6B6B6B', transition: 'all 0.2s',
                    }}>{p}</button>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>Available slots for {chosenDate}</p>

              {filteredSlots.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#A0A0A0', fontSize: 13 }}>No slots available for this filter.</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, maxHeight: 280, overflowY: 'auto' }} className="no-scrollbar">
                  {filteredSlots.map((slot, i) => (
                    <button key={i} disabled={!slot.available} onClick={() => setChosenTime(slot.time)} style={{
                      padding: '11px 6px', borderRadius: 12, border: '1.5px solid', fontSize: 12, fontWeight: 600,
                      cursor: slot.available ? 'pointer' : 'not-allowed', transition: 'all 0.15s',
                      borderColor: chosenTime === slot.time ? '#111' : slot.available ? '#E8E8E5' : '#F5F5F5',
                      background: chosenTime === slot.time ? '#111' : slot.available ? '#F7F7F5' : '#FAFAFA',
                      color: chosenTime === slot.time ? '#fff' : slot.available ? '#171717' : '#D0D0D0',
                      textDecoration: !slot.available ? 'line-through' : 'none',
                    }}>
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}

              {error && <div style={{ color: '#C62828', fontSize: 13, padding: '12px 16px', background: '#FFF5F5', borderRadius: 10, border: '1px solid #FFCDD2', marginTop: 16 }}>{error}</div>}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F0F0ED' }}>
                <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ padding: '12px 24px' }}>← Back</button>
                <button onClick={() => { if (!chosenTime) { setError('Please select a time.'); return; } setError(''); setStep(4); }} className="btn btn-primary" style={{ padding: '13px 28px', opacity: !chosenTime ? 0.4 : 1 }}>
                  Next: Your Details →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: DETAILS ── */}
          {step === 4 && (
            <form onSubmit={submit}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#171717', marginBottom: 6 }}>Your details</h2>
              <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>Almost done — just a few details to confirm your reservation.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={label}>Full Name *</label>
                  <input style={inp} required placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#A8B5A2'}
                    onBlur={e => e.target.style.borderColor = '#E8E8E5'}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="detail-cols">
                  <div>
                    <label style={label}>Email Address *</label>
                    <input style={inp} type="email" required placeholder="jane@example.com" value={email} onChange={e => setEmail(e.target.value)}
                      onFocus={e => e.target.style.borderColor = '#A8B5A2'}
                      onBlur={e => e.target.style.borderColor = '#E8E8E5'}
                    />
                  </div>
                  <div>
                    <label style={label}>Phone Number *</label>
                    <input style={inp} type="tel" required placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)}
                      onFocus={e => e.target.style.borderColor = '#A8B5A2'}
                      onBlur={e => e.target.style.borderColor = '#E8E8E5'}
                    />
                  </div>
                </div>
                <div>
                  <label style={label}>Special Requests (optional)</label>
                  <textarea style={{ ...inp, resize: 'vertical' }} rows={3} placeholder="Preferences, allergies, anything we should know…" value={notes} onChange={e => setNotes(e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#A8B5A2'}
                    onBlur={e => e.target.style.borderColor = '#E8E8E5'}
                  />
                </div>
              </div>

              {/* Summary */}
              <div style={{ background: '#F7F7F5', borderRadius: 14, padding: '16px 20px', marginTop: 20, border: '1px solid #E8E8E5' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Booking Summary</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { k: 'Service', v: chosenService?.title },
                    { k: 'Date', v: chosenDate },
                    { k: 'Time', v: chosenTime },
                    { k: 'Total', v: `$${chosenService?.price}` },
                  ].map(row => (
                    <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: '#6B6B6B' }}>{row.k}</span>
                      <span style={{ color: '#171717', fontWeight: 600 }}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {error && <div style={{ color: '#C62828', fontSize: 13, padding: '12px 16px', background: '#FFF5F5', borderRadius: 10, border: '1px solid #FFCDD2', marginTop: 16 }}>{error}</div>}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px solid #F0F0ED' }}>
                <button type="button" onClick={() => setStep(3)} className="btn btn-secondary" style={{ padding: '12px 24px' }}>← Back</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '14px 32px' }}>Confirm Booking</button>
              </div>
              <style>{`@media(max-width:500px){.detail-cols{grid-template-columns:1fr!important}}`}</style>
            </form>
          )}

          {/* ── STEP 5: CONFIRMATION ── */}
          {step === 5 && activeBookingResult && (
            <div style={{ textAlign: 'center' }}>
              {/* Check mark */}
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#171717', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6 10-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: '#171717', marginBottom: 8, lineHeight: 1.1 }}>
                You're booked.
              </h2>
              <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 32 }}>
                Your reservation is confirmed. We look forward to seeing you.
              </p>

              {/* Receipt card */}
              <div style={{ background: '#F7F7F5', borderRadius: 20, padding: '28px', border: '1px solid #E8E8E5', textAlign: 'left', marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #E8E8E5' }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#A0A0A0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Reference</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#171717', letterSpacing: '0.02em' }}>{activeBookingResult.id}</div>
                  </div>
                  <button onClick={() => copyRef(activeBookingResult.id)} style={{ padding: '8px 16px', borderRadius: 99, background: '#fff', border: '1px solid #E8E8E5', fontSize: 12, color: '#6B6B6B', cursor: 'pointer', fontWeight: 600 }}>
                    {copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>

                {[
                  { k: 'Service', v: activeBookingResult.serviceTitle },
                  { k: 'Date', v: activeBookingResult.date },
                  { k: 'Time', v: activeBookingResult.time },
                  { k: 'Guest', v: activeBookingResult.customerName },
                  { k: 'Total', v: `$${activeBookingResult.price}` },
                ].map(row => (
                  <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '10px 0', borderBottom: '1px solid #F0F0ED' }}>
                    <span style={{ color: '#6B6B6B' }}>{row.k}</span>
                    <span style={{ color: '#171717', fontWeight: 600 }}>{row.v}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => downloadIcs(activeBookingResult)} className="btn btn-secondary" style={{ padding: '12px 22px', fontSize: 12 }}>Add to Calendar</button>
                <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: '12px 22px', fontSize: 12 }}>Print Receipt</button>
                <button onClick={reset} className="btn btn-primary" style={{ padding: '12px 22px', fontSize: 12 }}>Book Another</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
