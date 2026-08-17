// index.jsx  ->  the "/" page: slot availability dashboard

import { useEffect, useState } from 'react';
import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { api } from '../api';

const statusColors = {
  available: 'bg-green-100 border-green-400 text-green-700',
  occupied: 'bg-blue-100 border-blue-400 text-blue-700',
  reserved: 'bg-yellow-100 border-yellow-400 text-yellow-700'
};

function Dashboard() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    async function loadSlots() {
      const data = await api.getSlots();
      setSlots(data.slots);
    }
    loadSlots();
    const interval = setInterval(loadSlots, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Slot Availability</h1>
      <p className="text-gray-500 mb-6">Green = available, Blue = occupied, Yellow = reserved</p>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`border-2 rounded-lg p-3 text-center ${statusColors[slot.status]}`}
          >
            <div className="font-bold">{slot.slotNumber}</div>
            <div className="text-xs uppercase">{slot.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Route = createRoute({ getParentRoute: () => RootRoute, path: '/', component: Dashboard });
