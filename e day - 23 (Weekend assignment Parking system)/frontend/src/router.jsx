// router.jsx
// Combines every page's Route export into one route tree.

import { createRouter } from '@tanstack/react-router';
import { Route as RootRoute } from './routes/__root';
import { Route as IndexRoute } from './routes/index';
import { Route as LoginRoute } from './routes/login';
import { Route as CheckinRoute } from './routes/checkin';
import { Route as CustomerRoute } from './routes/customer';
import { Route as AdminRoute } from './routes/admin';

const routeTree = RootRoute.addChildren([IndexRoute, LoginRoute, CheckinRoute, CustomerRoute, AdminRoute]);

export const router = createRouter({ routeTree });
