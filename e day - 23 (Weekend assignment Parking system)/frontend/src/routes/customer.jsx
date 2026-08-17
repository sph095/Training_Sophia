// customer.jsx  ->  customer looks up their own active session & bill

import { useState } from 'react';
import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { api } from '../api';

function CustomerPage() {
  const [plate, setPlate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const data = await api.lookup(plate);
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Parking</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder="Enter your plate number"
        />
        <button className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700">
          Search
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result && (
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h2 className="font-bold text-lg">{result.vehicle.plateNumber}</h2>

          {result.activeSession ? (
            <div>
              <p className="text-sm text-gray-600">
                Slot <b>{result.activeSession.Slot.slotNumber}</b> since{' '}
                {new Date(result.activeSession.checkInTime).toLocaleString()}
              </p>
              <div className="bg-gray-50 rounded p-4 mt-3">
                <p className="text-sm text-gray-500">Live estimate</p>
                <p className="text-2xl font-bold">₹{result.liveBill}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No active parking session.</p>
          )}

          {result.history.length > 0 && (
            <div>
              <h3 className="font-medium mb-2 text-sm">Recent visits</h3>
              {result.history.map((h) => (
                <div key={h.id} className="flex justify-between text-sm py-1 border-t">
                  <span className="text-gray-500">
                    {new Date(h.checkOutTime).toLocaleDateString()} · Slot {h.Slot.slotNumber}
                  </span>
                  <span className="font-medium">₹{h.amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const Route = createRoute({ getParentRoute: () => RootRoute, path: '/customer', component: CustomerPage });
