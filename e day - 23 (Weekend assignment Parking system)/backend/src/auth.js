// auth.js
// Two plain functions used as route guards. No Fastify "plugin" magic here -
// just regular functions that check the JWT token, so it's easy to read
// top to bottom. They're used like: { preHandler: [requireLogin] }

// Anyone with a valid token (staff or admin)
async function requireLogin(request, reply) {
  try {
    await request.jwtVerify(); // provided by the @fastify/jwt plugin
  } catch (err) {
    reply.code(401).send({ error: 'Please log in first' });
  }
}

// Only users whose token says role === 'admin'
async function requireAdmin(request, reply) {
  try {
    await request.jwtVerify();
    if (request.user.role !== 'admin') {
      reply.code(403).send({ error: 'Admins only' });
    }
  } catch (err) {
    reply.code(401).send({ error: 'Please log in first' });
  }
}

module.exports = { requireLogin, requireAdmin };
