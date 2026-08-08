import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';

const STATUS = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const STATUS_COLORS = {
  Confirmed:  { bg: '#EEF4FF', text: '#1A47A0', dot: '#3B82F6' },
  Pending:    { bg: '#FFFBEB', text: '#92400E', dot: '#F59E0B' },
  Completed:  { bg: '#F0FDF4', text: '#15533A', dot: '#22C55E' },
  Cancelled:  { bg: '#FEF2F2', text: '#991B1B', dot: '#EF4444' },
};

const ADMIN_PIN = '1234';

const NavItem = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
      borderRadius: 12, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
      background: active ? '#171717' : 'transparent',
      color: active ? '#fff' : '#6B6B6B',
      fontSize: 13, fontWeight: active ? 600 : 400,
      transition: 'all 0.2s',
    }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#F0F0ED'; e.currentTarget.style.color = '#171717'; } }}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B6B6B'; } }}
  >
    <span style={{ fontSize: 16 }}>{icon}</span>
    {label}
  </button>
);

export const AdminDashboard = () => {
  const {
    services, appointments, operatingHours, holidays,
    isAdminLoggedIn, setIsAdminLoggedIn,
    updateBookingStatus, addService, updateService, deleteService,
    updateOperatingHours, addHoliday, removeHoliday, addToast,
  } = useSalon();

  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [section, setSection] = useState('overview');

  // Service form state
  const [srvForm, setSrvForm] = useState({ title: '', category: 'Hair', price: '', duration: 60, description: '', image: '', popular: false });
  const [editingSrv, setEditingSrv] = useState(null);

  // Holiday state
  const [newHoliday, setNewHoliday] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayApts = appointments.filter(a => a.date === today);
  const upcoming = appointments.filter(a => a.date >= today && a.status !== 'Cancelled').sort((a, b) => a.date.localeCompare(b.date));
  const revenue = appointments.filter(a => a.status === 'Completed').reduce((sum, a) => sum + a.price, 0);
  const totalClients = new Set(appointments.map(a => a.customerEmail)).size;

  const login = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN || pin === '') { setIsAdminLoggedIn(true); }
    else { setPinErr('Incorrect PIN. Hint: 1234'); }
  };

  const saveSrv = () => {
    if (!srvForm.title || !srvForm.price) { addToast('Title and price are required.', 'error'); return; }
    const data = { ...srvForm, price: Number(srvForm.price), duration: Number(srvForm.duration) };
    if (editingSrv) { updateService(editingSrv, data); setEditingSrv(null); }
    else { addService(data); }
    setSrvForm({ title: '', category: 'Hair', price: '', duration: 60, description: '', image: '', popular: false });
  };

  const inp = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid #E8E8E5', background: '#F7F7F5',
    fontSize: 13, color: '#171717', outline: 'none', fontFamily: 'DM Sans, sans-serif',
  };
  const label = { fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 4 };

  if (!isAdminLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#F7F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', maxWidth: 400, width: '100%', border: '1px solid #E8E8E5', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F7F7F5', border: '1px solid #E8E8E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 22 }}>🔒</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#171717', marginBottom: 6 }}>Admin Access</h2>
          <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 28 }}>Enter your PIN to access the dashboard.</p>

          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input type="password" maxLength={4} placeholder="••••" value={pin} onChange={e => setPin(e.target.value)}
              style={{ ...inp, textAlign: 'center', fontSize: 20, letterSpacing: '0.3em', padding: '14px' }}
            />
            {pinErr && <div style={{ fontSize: 12, color: '#C62828' }}>{pinErr}</div>}
            <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: 13 }}>Access Dashboard</button>
            <button type="button" onClick={() => setIsAdminLoggedIn(true)} style={{ background: 'none', border: 'none', color: '#A0A0A0', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
              Demo access (skip PIN)
            </button>
          </form>
        </div>
      </div>
    );
  }

  const nav = [
    { id: 'overview', label: 'Overview', icon: '◻' },
    { id: 'appointments', label: 'Appointments', icon: '◷' },
    { id: 'services', label: 'Services', icon: '✦' },
    { id: 'hours', label: 'Hours & Holidays', icon: '⊕' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F5', display: 'flex' }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, background: '#fff', borderRight: '1px solid #E8E8E5',
        padding: '32px 16px', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 40,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 32, paddingLeft: 14 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 600, color: '#171717', lineHeight: 1.2 }}>Royal Salon</div>
          <div style={{ fontSize: 11, color: '#A0A0A0', fontWeight: 500, marginTop: 2 }}>Admin Dashboard</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {nav.map(n => (
            <NavItem key={n.id} {...n} active={section === n.id} onClick={() => setSection(n.id)} />
          ))}
        </nav>

        <button
          onClick={() => setIsAdminLoggedIn(false)}
          style={{ padding: '10px 14px', borderRadius: 12, background: 'none', border: '1px solid #E8E8E5', fontSize: 12, color: '#6B6B6B', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Sign Out
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 220, padding: '32px 36px', maxWidth: '100%' }}>

        {/* OVERVIEW */}
        {section === 'overview' && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: '#171717', marginBottom: 28 }}>
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}.
            </h1>

            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }} className="metrics-grid">
              {[
                { label: "Today's Bookings", value: todayApts.length, sub: `${todayApts.filter(a => a.status !== 'Cancelled').length} active` },
                { label: 'Total Upcoming',   value: upcoming.length,  sub: 'next 30 days' },
                { label: 'Revenue (completed)', value: `$${revenue.toLocaleString()}`, sub: 'all time' },
                { label: 'Unique Clients',   value: totalClients,     sub: 'total' },
              ].map(m => (
                <div key={m.label} style={{ background: '#fff', borderRadius: 16, padding: '20px 22px', border: '1px solid #E8E8E5', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#171717', lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontSize: 12, color: '#A0A0A0', marginTop: 4 }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Today's schedule */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '24px 28px', border: '1px solid #E8E8E5', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: '#171717', marginBottom: 20 }}>
                Today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h2>

              {todayApts.length === 0 ? (
                <p style={{ fontSize: 14, color: '#A0A0A0', padding: '20px 0' }}>No appointments today.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {todayApts.sort((a, b) => a.time.localeCompare(b.time)).map(apt => {
                    const sc = STATUS_COLORS[apt.status] || STATUS_COLORS.Pending;
                    return (
                      <div key={apt.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 12, background: '#F7F7F5', flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: '#171717', minWidth: 48 }}>{apt.time}</div>
                        <div style={{ flex: 1, minWidth: 120 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#171717' }}>{apt.customerName}</div>
                          <div style={{ fontSize: 12, color: '#6B6B6B' }}>{apt.serviceTitle}</div>
                        </div>
                        <span style={{ padding: '4px 12px', borderRadius: 99, background: sc.bg, color: sc.text, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />{apt.status}
                        </span>
                        <select value={apt.status} onChange={e => updateBookingStatus(apt.id, e.target.value)}
                          style={{ padding: '5px 10px', borderRadius: 8, border: '1px solid #E8E8E5', background: '#fff', fontSize: 12, color: '#171717', cursor: 'pointer' }}>
                          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {section === 'appointments' && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: '#171717', marginBottom: 28 }}>All Appointments</h1>

            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8E8E5', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#F7F7F5', borderBottom: '1px solid #E8E8E5' }}>
                      {['Ref', 'Client', 'Service', 'Date', 'Time', 'Amount', 'Status', 'Action'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#A0A0A0', fontSize: 13 }}>No appointments yet.</td></tr>
                    ) : (
                      appointments.map((apt, i) => {
                        const sc = STATUS_COLORS[apt.status] || STATUS_COLORS.Pending;
                        return (
                          <tr key={apt.id} style={{ borderBottom: '1px solid #F0F0ED', background: i % 2 === 0 ? '#fff' : '#FAFAF9' }}>
                            <td style={{ padding: '14px 16px', fontWeight: 600, color: '#171717', whiteSpace: 'nowrap' }}>{apt.id}</td>
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ fontWeight: 600, color: '#171717' }}>{apt.customerName}</div>
                              <div style={{ fontSize: 11, color: '#A0A0A0' }}>{apt.customerPhone}</div>
                            </td>
                            <td style={{ padding: '14px 16px', color: '#6B6B6B', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{apt.serviceTitle}</td>
                            <td style={{ padding: '14px 16px', color: '#171717', whiteSpace: 'nowrap' }}>{apt.date}</td>
                            <td style={{ padding: '14px 16px', color: '#171717' }}>{apt.time}</td>
                            <td style={{ padding: '14px 16px', fontWeight: 600, color: '#171717' }}>${apt.price}</td>
                            <td style={{ padding: '14px 16px' }}>
                              <span style={{ padding: '4px 10px', borderRadius: 99, background: sc.bg, color: sc.text, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />{apt.status}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <select value={apt.status} onChange={e => updateBookingStatus(apt.id, e.target.value)}
                                style={{ padding: '5px 8px', borderRadius: 8, border: '1px solid #E8E8E5', background: '#F7F7F5', fontSize: 11, color: '#171717', cursor: 'pointer' }}>
                                {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES */}
        {section === 'services' && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: '#171717', marginBottom: 28 }}>Services</h1>

            {/* Add/Edit form */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '28px', border: '1px solid #E8E8E5', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: '#171717', marginBottom: 20 }}>
                {editingSrv ? 'Edit Service' : 'Add New Service'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="srv-form-grid">
                {[
                  { key: 'title',       label: 'Title', placeholder: 'Signature Haircut & Blowout' },
                  { key: 'price',       label: 'Price ($)', placeholder: '120', type: 'number' },
                  { key: 'duration',    label: 'Duration (min)', placeholder: '60', type: 'number' },
                  { key: 'image',       label: 'Image URL', placeholder: 'https://...' },
                  { key: 'description', label: 'Description', placeholder: 'Short description…', full: true },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.full ? '1 / -1' : 'auto' }}>
                    <label style={label}>{f.label}</label>
                    {f.full ? (
                      <textarea style={{ ...inp, resize: 'vertical' }} rows={2} placeholder={f.placeholder} value={srvForm[f.key] || ''} onChange={e => setSrvForm(p => ({ ...p, [f.key]: e.target.value }))} />
                    ) : (
                      <input style={inp} type={f.type || 'text'} placeholder={f.placeholder} value={srvForm[f.key] || ''} onChange={e => setSrvForm(p => ({ ...p, [f.key]: e.target.value }))} />
                    )}
                  </div>
                ))}
                <div>
                  <label style={label}>Category</label>
                  <select style={inp} value={srvForm.category} onChange={e => setSrvForm(p => ({ ...p, category: e.target.value }))}>
                    {['Hair', 'Styling', 'Facial', 'Makeup', 'Nails', 'Grooming'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 20 }}>
                  <input type="checkbox" id="popular" checked={srvForm.popular} onChange={e => setSrvForm(p => ({ ...p, popular: e.target.checked }))} />
                  <label htmlFor="popular" style={{ ...label, marginBottom: 0, cursor: 'pointer' }}>Mark as Popular</label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                {editingSrv && (
                  <button onClick={() => { setEditingSrv(null); setSrvForm({ title: '', category: 'Hair', price: '', duration: 60, description: '', image: '', popular: false }); }} className="btn btn-secondary" style={{ padding: '11px 20px', fontSize: 12 }}>Cancel</button>
                )}
                <button onClick={saveSrv} className="btn btn-primary" style={{ padding: '11px 24px', fontSize: 12 }}>
                  {editingSrv ? 'Save Changes' : 'Add Service'}
                </button>
              </div>
            </div>

            {/* Service list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {services.map(srv => (
                <div key={srv.id} style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', border: '1px solid #E8E8E5', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <img src={srv.image} alt={srv.title} style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 600, color: '#171717' }}>{srv.title}</div>
                    <div style={{ fontSize: 12, color: '#6B6B6B' }}>{srv.category} · {srv.duration} min · <strong>${srv.price}</strong></div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => { setEditingSrv(srv.id); setSrvForm({ title: srv.title, category: srv.category, price: srv.price, duration: srv.duration, description: srv.description, image: srv.image, popular: srv.popular || false }); }}
                      className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 11 }}>Edit</button>
                    <button onClick={() => deleteService(srv.id)} style={{ padding: '8px 16px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: '#FEF2F2', color: '#C62828', border: '1px solid #FFCDD2', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOURS & HOLIDAYS */}
        {section === 'hours' && (
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: '#171717', marginBottom: 28 }}>Hours & Holidays</h1>

            {/* Operating hours */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '28px', border: '1px solid #E8E8E5', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: '#171717', marginBottom: 20 }}>Operating Hours</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Object.entries(operatingHours).map(([day, val]) => {
                  const [h, setH] = useState(val);
                  return (
                    <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', borderRadius: 12, background: '#F7F7F5', flexWrap: 'wrap' }}>
                      <div style={{ minWidth: 100, fontSize: 13, fontWeight: 600, color: '#171717' }}>{day}</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B6B6B', cursor: 'pointer' }}>
                        <input type="checkbox" checked={val.active}
                          onChange={e => { const updated = { ...operatingHours, [day]: { ...val, active: e.target.checked } }; updateOperatingHours(updated); }}
                        /> Open
                      </label>
                      {val.active && (
                        <>
                          <input type="time" value={val.open} onChange={e => updateOperatingHours({ ...operatingHours, [day]: { ...val, open: e.target.value } })}
                            style={{ ...inp, width: 'auto', padding: '6px 10px', fontSize: 12 }} />
                          <span style={{ fontSize: 12, color: '#A0A0A0' }}>to</span>
                          <input type="time" value={val.close} onChange={e => updateOperatingHours({ ...operatingHours, [day]: { ...val, close: e.target.value } })}
                            style={{ ...inp, width: 'auto', padding: '6px 10px', fontSize: 12 }} />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Holidays */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '28px', border: '1px solid #E8E8E5' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: '#171717', marginBottom: 20 }}>Blocked Holidays</h2>
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                <input type="date" value={newHoliday} min={today} onChange={e => setNewHoliday(e.target.value)} style={{ ...inp, width: 'auto', padding: '10px 14px', flex: 1 }} />
                <button onClick={() => { if (newHoliday) { addHoliday(newHoliday); setNewHoliday(''); } }} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 12 }}>Add Date</button>
              </div>
              {holidays.length === 0 ? (
                <p style={{ fontSize: 13, color: '#A0A0A0' }}>No blocked holidays.</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {holidays.map(d => (
                    <span key={d} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 99, background: '#FFF5F5', border: '1px solid #FFCDD2', fontSize: 13, color: '#C62828', fontWeight: 500 }}>
                      {d}
                      <button onClick={() => removeHoliday(d)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C62828', fontWeight: 700, fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <style>{`
        @media(max-width:900px){
          .metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:600px){
          .metrics-grid { grid-template-columns: 1fr !important; }
          .srv-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
