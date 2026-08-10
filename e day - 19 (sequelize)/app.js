require('dotenv').config();
const Fastify = require('fastify');
const sequelize = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');

const fastify = Fastify({ logger: true });

fastify.register(studentRoutes, { prefix: '/api' });

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync(); // use { force: true } only in dev to drop & recreate tables
    fastify.log.info('Database connected & synced.');

    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
