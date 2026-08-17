// api.js
// Every call to the backend goes through this one file.
// It reads the saved token (if any) and attaches it as an Authorization
// header, so components never have to deal with that themselves.

async function call(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

export const api = {
  login: (email, password) => call('/login', { method: 'POST', body: { email, password } }),
  getSlots: () => call('/slots'),
  getRates: () => call('/rates'),
  checkin: (data) => call('/checkin', { method: 'POST', body: data }),
  getActiveSessions: () => call('/active-sessions'),
  checkout: (sessionId) => call(`/checkout/${sessionId}`, { method: 'POST' }),
  lookup: (plateNumber) => call(`/lookup/${plateNumber}`),
  createBooking: (data) => call('/bookings', { method: 'POST', body: data }),
  getBookings: () => call('/bookings'),
  activateBooking: (id) => call(`/bookings/${id}/activate`, { method: 'POST' }),
  getOccupancy: () => call('/reports/occupancy'),
  getRevenue: () => call('/reports/revenue')
};
