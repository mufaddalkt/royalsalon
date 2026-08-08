import React, { createContext, useContext, useState, useEffect } from 'react';

const SalonContext = createContext();

// Initial Seed Data for Services
const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    title: 'Royal Signature Haircut & Blowout',
    category: 'Hair',
    categoryIcon: '💇‍♀️',
    price: 125,
    duration: 60,
    rating: 4.95,
    reviewsCount: 184,
    description: 'Precision cut tailored to your facial symmetry, accompanied by an aromatic scalp massager and signature royal blowout.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    features: ['Custom Symmetry Analysis', 'Essential Oil Scalp Ritual', 'Signature Royal Blowout', 'Heat Styling Finish'],
    popular: true
  },
  {
    id: 'srv-2',
    title: 'Artisan Balayage & Silk Gloss',
    category: 'Hair',
    categoryIcon: '💇‍♀️',
    price: 245,
    duration: 150,
    rating: 4.98,
    reviewsCount: 230,
    description: 'Hand-painted dimensional highlighting technique paired with custom glossing and bond-strengthening deep therapy.',
    image: '/images/royal_hair_color.jpg',
    features: ['Custom Color Formulation', 'OLAPLEX Bond Treatment', 'Dimensional Toning', 'Blowout & Waves'],
    popular: true
  },
  {
    id: 'srv-3',
    title: 'Couture Evening & Event Styling',
    category: 'Styling',
    categoryIcon: '💇‍♂️',
    price: 140,
    duration: 75,
    rating: 4.92,
    reviewsCount: 96,
    description: 'Glamorous updo, vintage Hollywood waves, or modern crown braid tailored for gala events and red-carpet appearances.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
    features: ['Consultation & Theme Matching', 'Longevity Hold Formula', 'Optional Hair Piece Placement', 'Shine Mist Finish'],
    popular: false
  },
  {
    id: 'srv-4',
    title: '24K Imperial Gold Facial',
    category: 'Facial',
    categoryIcon: '✨',
    price: 210,
    duration: 75,
    rating: 4.99,
    reviewsCount: 312,
    description: 'Ultra-luxurious anti-aging therapy featuring pure 24K gold foil infusion, collagen boosting LED, and micro-current lifting.',
    image: '/images/royal_facial_spa.jpg',
    features: ['24K Gold Leaf Infusion', 'Lymphatic Drainage Massage', 'Red Light LED Therapy', 'Hyaluronic Acid Surge'],
    popular: true
  },
  {
    id: 'srv-5',
    title: 'Hydra-Infusion Botanical Glow',
    category: 'Facial',
    categoryIcon: '✨',
    price: 165,
    duration: 60,
    rating: 4.91,
    reviewsCount: 124,
    description: 'Deep pore vacuum extraction combined with rich peptide hydration for immediate radiant glow without downtime.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    features: ['Pore Hydro-Exfoliation', 'Custom Serum Infusion', 'Cryo-Sculpting Globe Massage', 'Broad Spectrum UV Defense'],
    popular: false
  },
  {
    id: 'srv-6',
    title: 'Royal Evening Glam Makeup',
    category: 'Makeup',
    categoryIcon: '💄',
    price: 155,
    duration: 60,
    rating: 4.96,
    reviewsCount: 178,
    description: 'Full coverage airbrush application, sculpted contouring, customized mink lashes, and long-wear setting formulation.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800',
    features: ['Luxury Airbrush Foundation', 'Custom Lash Application', 'Waterproof Lip & Eye Lock', 'Touch-up Kit Included'],
    popular: true
  },
  {
    id: 'srv-7',
    title: 'Bridal Masterpiece Package',
    category: 'Makeup',
    categoryIcon: '💄',
    price: 280,
    duration: 100,
    rating: 5.0,
    reviewsCount: 145,
    description: 'Exclusive wedding day consultation and high-definition luxury makeup crafting tailored for photo longevity and royalty aesthetics.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800',
    features: ['Pre-wedding Trial Review', 'Premium Silk Lashes', 'Décolletage Luminizer', 'Luxury Touch-up Pouch'],
    popular: false
  },
  {
    id: 'srv-8',
    title: 'Royal Diamond Gel Manicure & Spa',
    category: 'Nails',
    categoryIcon: '💅',
    price: 85,
    duration: 50,
    rating: 4.94,
    reviewsCount: 204,
    description: 'Nail shaping, Russian e-file cuticle care, diamond shimmer gel polish, organic exfoliation, and hot towel paraffin treatment.',
    image: '/images/royal_nail_spa.jpg',
    features: ['E-File Russian Precision', 'Non-Toxic Diamond Gel', 'Hot Towel Paraffin Infusion', 'Hand & Arm Reflexology'],
    popular: true
  },
  {
    id: 'srv-9',
    title: 'Gentleman’s Royal Beard & Shave Ritual',
    category: 'Grooming',
    categoryIcon: '💈',
    price: 75,
    duration: 45,
    rating: 4.93,
    reviewsCount: 110,
    description: 'Hot towel steam treatment, straight razor precision shave, natural beard oil conditioning, and soothing aloe mask finish.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800',
    features: ['Double Hot Towel Steam', 'Straight Razor Detail', 'Cold Stone Pore Closure', 'Beard Styling & Oil'],
    popular: false
  }
];

// Initial Operating Hours (Mon - Sun)
const INITIAL_HOURS = {
  Monday: { open: '09:00', close: '20:00', active: true },
  Tuesday: { open: '09:00', close: '20:00', active: true },
  Wednesday: { open: '09:00', close: '20:00', active: true },
  Thursday: { open: '09:00', close: '20:00', active: true },
  Friday: { open: '09:00', close: '21:00', active: true },
  Saturday: { open: '09:00', close: '20:00', active: true },
  Sunday: { open: '10:00', close: '18:00', active: true },
};

const getInitialAppointments = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  return [
    {
      id: 'RS-9012',
      serviceId: 'srv-1',
      serviceTitle: 'Royal Signature Haircut & Blowout',
      price: 125,
      duration: 60,
      date: todayStr,
      time: '10:00',
      customerName: 'Duchess Eleanor Vance',
      customerEmail: 'eleanor.vance@example.com',
      customerPhone: '+1 (555) 234-5678',
      notes: 'Prefers organic lavender hair products.',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    },
    {
      id: 'RS-7842',
      serviceId: 'srv-4',
      serviceTitle: '24K Imperial Gold Facial',
      price: 210,
      duration: 75,
      date: todayStr,
      time: '14:00',
      customerName: 'Victoria Sterling',
      customerEmail: 'v.sterling@example.com',
      customerPhone: '+1 (555) 876-5432',
      notes: 'First time visiting Royal Salon.',
      status: 'Pending',
      createdAt: new Date().toISOString()
    },
    {
      id: 'RS-3421',
      serviceId: 'srv-6',
      serviceTitle: 'Royal Evening Glam Makeup',
      price: 155,
      duration: 60,
      date: todayStr,
      time: '16:30',
      customerName: 'Lady Catherine Thorne',
      customerEmail: 'catherine.thorne@example.com',
      customerPhone: '+1 (555) 998-1122',
      notes: 'Attending gala at 7 PM.',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    }
  ];
};

export const SalonProvider = ({ children }) => {
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('royal_salon_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('royal_salon_appointments');
    return saved ? JSON.parse(saved) : getInitialAppointments();
  });

  const [operatingHours, setOperatingHours] = useState(() => {
    const saved = localStorage.getItem('royal_salon_hours');
    return saved ? JSON.parse(saved) : INITIAL_HOURS;
  });

  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem('royal_salon_holidays');
    return saved ? JSON.parse(saved) : ['2026-12-25', '2026-01-01'];
  });

  const [activeTab, setActiveTab] = useState('home');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [activeBookingResult, setActiveBookingResult] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);

  // Toast Notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('royal_salon_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('royal_salon_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('royal_salon_hours', JSON.stringify(operatingHours));
  }, [operatingHours]);

  useEffect(() => {
    localStorage.setItem('royal_salon_holidays', JSON.stringify(holidays));
  }, [holidays]);

  const isDateClosed = (dateStr) => {
    if (holidays.includes(dateStr)) return true;
    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dateObj.getDay()];
    const schedule = operatingHours[dayName];
    return !schedule || !schedule.active;
  };

  const isSlotAvailable = (dateStr, timeStr, durationMinutes, excludeAppointmentId = null) => {
    if (!dateStr || !timeStr) return false;
    if (isDateClosed(dateStr)) return false;

    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dateObj.getDay()];
    const schedule = operatingHours[dayName];
    if (!schedule || !schedule.active) return false;

    const [reqHour, reqMin] = timeStr.split(':').map(Number);
    const reqStartTotal = reqHour * 60 + reqMin;
    const reqEndTotal = reqStartTotal + durationMinutes;

    const [openHour, openMin] = schedule.open.split(':').map(Number);
    const openTotal = openHour * 60 + openMin;
    const [closeHour, closeMin] = schedule.close.split(':').map(Number);
    const closeTotal = closeHour * 60 + closeMin;

    if (reqStartTotal < openTotal || reqEndTotal > closeTotal) {
      return false;
    }

    const dayBookings = appointments.filter(
      apt => apt.date === dateStr && apt.status !== 'Cancelled' && apt.id !== excludeAppointmentId
    );

    for (let apt of dayBookings) {
      const [aptHour, aptMin] = apt.time.split(':').map(Number);
      const aptStart = aptHour * 60 + aptMin;
      const aptEnd = aptStart + (apt.duration || 60);

      if (reqStartTotal < aptEnd && reqEndTotal > aptStart) {
        return false;
      }
    }

    return true;
  };

  const getAvailableSlots = (dateStr, durationMinutes = 60, excludeAppointmentId = null) => {
    if (!dateStr || isDateClosed(dateStr)) return [];

    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dateObj.getDay()];
    const schedule = operatingHours[dayName];
    if (!schedule || !schedule.active) return [];

    const [openHour, openMin] = schedule.open.split(':').map(Number);
    const [closeHour, closeMin] = schedule.close.split(':').map(Number);
    
    const slots = [];
    let currentMin = openHour * 60 + openMin;
    const closeMinTotal = closeHour * 60 + closeMin;

    while (currentMin + durationMinutes <= closeMinTotal) {
      const h = Math.floor(currentMin / 60);
      const m = currentMin % 60;
      const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      
      const available = isSlotAvailable(dateStr, timeStr, durationMinutes, excludeAppointmentId);
      
      let period = 'Morning';
      if (h >= 12 && h < 17) period = 'Afternoon';
      else if (h >= 17) period = 'Evening';

      slots.push({
        time: timeStr,
        available,
        period
      });

      currentMin += 30;
    }

    return slots;
  };

  const addBooking = (bookingData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `RS-${randomNum}`;
    const service = services.find(s => s.id === bookingData.serviceId);
    
    const newAppointment = {
      id: newId,
      serviceId: bookingData.serviceId,
      serviceTitle: service ? service.title : 'Royal Hair & Beauty',
      price: service ? service.price : 100,
      duration: service ? service.duration : 60,
      date: bookingData.date,
      time: bookingData.time,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      notes: bookingData.notes || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [newAppointment, ...prev]);
    setActiveBookingResult(newAppointment);
    addToast(`Reservation ${newId} confirmed for ${bookingData.customerName}!`, 'success');
    return newAppointment;
  };

  const rescheduleBooking = (appointmentId, newDate, newTime) => {
    const apt = appointments.find(a => a.id === appointmentId);
    if (!apt) return { success: false, message: 'Appointment not found' };

    if (!isSlotAvailable(newDate, newTime, apt.duration, appointmentId)) {
      addToast('Selected slot is no longer available.', 'error');
      return { success: false, message: 'Selected slot is no longer available.' };
    }

    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, date: newDate, time: newTime, status: 'Confirmed' };
      }
      return a;
    }));

    addToast(`Appointment ${appointmentId} rescheduled to ${newDate} at ${newTime}!`, 'success');
    return { success: true, message: 'Appointment rescheduled successfully!' };
  };

  const cancelBooking = (appointmentId) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, status: 'Cancelled' };
      }
      return a;
    }));
    addToast(`Appointment ${appointmentId} has been cancelled.`, 'info');
  };

  const updateBookingStatus = (appointmentId, status) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, status };
      }
      return a;
    }));
    addToast(`Updated ${appointmentId} status to ${status}.`, 'info');
  };

  const addService = (newService) => {
    const id = `srv-${Date.now()}`;
    const serviceWithId = { ...newService, id, rating: 5.0, reviewsCount: 1 };
    setServices(prev => [...prev, serviceWithId]);
    addToast(`Added new service: ${newService.title}`, 'success');
  };

  const updateService = (id, updatedService) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
    addToast(`Updated service details`, 'info');
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addToast(`Service removed`, 'info');
  };

  const updateOperatingHours = (newHours) => {
    setOperatingHours(newHours);
    addToast(`Salon operating hours updated`, 'success');
  };

  const addHoliday = (dateStr) => {
    if (!holidays.includes(dateStr)) {
      setHolidays(prev => [...prev, dateStr]);
      addToast(`Added blocked holiday: ${dateStr}`, 'info');
    }
  };

  const removeHoliday = (dateStr) => {
    setHolidays(prev => prev.filter(d => d !== dateStr));
    addToast(`Removed blocked holiday: ${dateStr}`, 'info');
  };

  return (
    <SalonContext.Provider value={{
      services,
      appointments,
      operatingHours,
      holidays,
      activeTab,
      setActiveTab,
      selectedServiceForBooking,
      setSelectedServiceForBooking,
      activeBookingResult,
      setActiveBookingResult,
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      isQuickBookingOpen,
      setIsQuickBookingOpen,
      toasts,
      addToast,
      removeToast,
      isDateClosed,
      isSlotAvailable,
      getAvailableSlots,
      addBooking,
      rescheduleBooking,
      cancelBooking,
      updateBookingStatus,
      addService,
      updateService,
      deleteService,
      updateOperatingHours,
      addHoliday,
      removeHoliday
    }}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => useContext(SalonContext);
