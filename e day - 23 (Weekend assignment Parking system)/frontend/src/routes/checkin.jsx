// checkin.jsx  ->  the staff desk: check vehicles in and out

import { useEffect, useState } from 'react';
import { createRoute, redirect } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { api } from '../api';

function CheckinPage() {
  const [slots, setSlots] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [slotId, setSlotId] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadData() {
    const [slotData, sessionData] = await Promise.all([api.getSlots(), api.getActiveSessions()]);
    setSlots(slotData.slots.filter((s) => s.status === 'available'));
    setActiveSessions(sessionData.sessions);
  }

  useEffect(() => { loadData(); }, []);

  async function handleCheckin(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const data = await api.checkin({ plateNumber, vehicleType, slotId: Number(slotId), ownerEmail });
      setMessage(`Checked in ${data.vehicle.plateNumber} into slot ${data.slot.slotNumber}`);
      setPlateNumber('');
      setSlotId('');
      setOwnerEmail('');
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCheckout(sessionId) {
    setError('');
    setMessage('');
    try {
      const data = await api.checkout(sessionId);
      setMessage(`Checked out. Bill: ₹${data.amount}`);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  const slotsForType = slots.filter((s) => s.vehicleType === vehicleType);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vehicle Entry / Exit</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Check-in form */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Check In</h2>
          <form onSubmit={handleCheckin} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Plate Number</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder="KA01AB1234"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={vehicleType}
                onChange={(e) => { setVehicleType(e.target.value); setSlotId(''); }}
              >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="truck">Truck</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slot</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
                required
              >
                <option value="">Select a slot...</option>
                {slotsForType.map((s) => (
                  <option key={s.id} value={s.id}>{s.slotNumber}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Owner Email (optional)</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}
            <button className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700">
              Check In
            </button>
          </form>
        </div>

        {/* Active sessions / checkout */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Active Sessions ({activeSessions.length})</h2>
          <div className="space-y-2">
            {activeSessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between border rounded px-3 py-2">
                <div>
                  <div className="font-medium">{s.Vehicle.plateNumber}</div>
                  <div className="text-xs text-gray-500">Slot {s.Slot.slotNumber}</div>
                </div>
                <button
                  onClick={() => handleCheckout(s.id)}
                  className="text-sm border rounded px-3 py-1 hover:bg-gray-50"
                >
                  Check Out
                </button>
              </div>
            ))}
            {activeSessions.length === 0 && <p className="text-sm text-gray-500">No active sessions.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/checkin',
  beforeLoad: () => {
    if (!localStorage.getItem('token')) throw redirect({ to: '/login' });
  },
  component: CheckinPage
});
