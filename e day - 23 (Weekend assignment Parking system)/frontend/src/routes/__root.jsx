// __root.jsx
// The layout every page shares: a navbar on top, and the current page
// rendered below it via <Outlet />.

import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useAuth } from '../AuthContext';

function Layout() {
  const { user, logout, isAdmin } = useAuth();

  const linkClass = 'px-3 py-2 rounded text-sm font-medium text-gray-600 hover:bg-gray-100';

  return (
    <div>
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
          <Link to="/" className="font-bold text-lg text-blue-600">ParkEasy</Link>
          <nav className="flex gap-1">
            <Link to="/" className={linkClass}>Dashboard</Link>
            <Link to="/customer" className={linkClass}>Customer</Link>
            {user && <Link to="/checkin" className={linkClass}>Check-in/out</Link>}
            {isAdmin && <Link to="/admin" className={linkClass}>Admin</Link>}
            {!user ? (
              <Link to="/login" className={linkClass}>Staff Login</Link>
            ) : (
              <button onClick={logout} className={linkClass}>Logout ({user.name})</button>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({ component: Layout });
