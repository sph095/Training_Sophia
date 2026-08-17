// server.js
// This is the one file you run. It creates the Fastify app, connects the
// plugins, registers all the routes, connects to the database, and starts
// listening - all in one place so you can read the whole boot process
// top to bottom.

require('dotenv').config();
const Fastify = require('fastify');
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');

const { sequelize } = require('./models');
const registerRoutes = require('./routes');

const app = Fastify({ logger: true });

app.register(cors, { origin: true });
app.register(jwt, { secret: process.env.JWT_SECRET });

registerRoutes(app);

async function start() {
  await sequelize.authenticate();
  console.log('Connected to PostgreSQL');

  await sequelize.sync(); // creates tables if they don't exist yet
  console.log('Tables are ready');

  await app.listen({ port: process.env.PORT || 4000, host: '0.0.0.0' });
  console.log(`API running on http://localhost:${process.env.PORT || 4000}`);
}

start().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
