// admin.jsx  ->  occupancy/revenue stats + reserve-a-slot booking

import { useEffect, useState } from 'react';
import { createRoute, redirect } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { api } from '../api';

function AdminPage() {
  const [occupancy, setOccupancy] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [slotId, setSlotId] = useState('');
  const [reservedFrom, setReservedFrom] = useState('');
  const [reservedTo, setReservedTo] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadAll() {
    const [occ, rev, slotData, bookingData] = await Promise.all([
      api.getOccupancy(),
      api.getRevenue(),
      api.getSlots(),
      api.getBookings()
    ]);
    setOccupancy(occ);
    setRevenue(rev);
    setSlots(slotData.slots.filter((s) => s.status === 'available'));
    setBookings(bookingData.bookings);
  }

  useEffect(() => { loadAll(); }, []);

  async function handleBook(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.createBooking({ plateNumber, vehicleType, slotId: Number(slotId), reservedFrom, reservedTo });
      setMessage('Slot reserved.');
      setPlateNumber('');
      setSlotId('');
      await loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleActivate(id) {
    await api.activateBooking(id);
    await loadAll();
  }

  if (!occupancy || !revenue) return <p>Loading...</p>;

  const slotsForType = slots.filter((s) => s.vehicleType === vehicleType);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xs text-gray-500">Occupancy Rate</p>
          <p className="text-2xl font-bold">{occupancy.occupancyRate}%</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xs text-gray-500">Available Slots</p>
          <p className="text-2xl font-bold">{occupancy.available}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xs text-gray-500">Reserved Slots</p>
          <p className="text-2xl font-bold">{occupancy.reserved}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xs text-gray-500">Today's Revenue</p>
          <p className="text-2xl font-bold">₹{revenue.totalRevenue}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reserve a slot */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Reserve a Slot</h2>
          <form onSubmit={handleBook} className="space-y-3">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Plate number"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
              required
            />
            <select
              className="w-full border rounded px-3 py-2"
              value={vehicleType}
              onChange={(e) => { setVehicleType(e.target.value); setSlotId(''); }}
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="truck">Truck</option>
            </select>
            <select
              className="w-full border rounded px-3 py-2"
              value={slotId}
              onChange={(e) => setSlotId(e.target.value)}
              required
            >
              <option value="">Select a slot...</option>
              {slotsForType.map((s) => <option key={s.id} value={s.id}>{s.slotNumber}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="datetime-local"
                className="border rounded px-3 py-2"
                value={reservedFrom}
                onChange={(e) => setReservedFrom(e.target.value)}
                required
              />
              <input
                type="datetime-local"
                className="border rounded px-3 py-2"
                value={reservedTo}
                onChange={(e) => setReservedTo(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}
            <button className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700">
              Reserve
            </button>
          </form>
        </div>

        {/* Upcoming bookings */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Upcoming Reservations</h2>
          <div className="space-y-2">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between border rounded px-3 py-2">
                <div>
                  <div className="font-medium">{b.Vehicle.plateNumber}</div>
                  <div className="text-xs text-gray-500">Slot {b.Slot.slotNumber}</div>
                </div>
                <button
                  onClick={() => handleActivate(b.id)}
                  className="text-sm border rounded px-3 py-1 hover:bg-gray-50"
                >
                  Mark Arrived
                </button>
              </div>
            ))}
            {bookings.length === 0 && <p className="text-sm text-gray-500">No upcoming reservations.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/admin',
  beforeLoad: () => {
    const saved = localStorage.getItem('user');
    const user = saved ? JSON.parse(saved) : null;
    if (!user || user.role !== 'admin') throw redirect({ to: '/login' });
  },
  component: AdminPage
});
