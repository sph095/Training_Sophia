// routes.js
// Every API endpoint lives here, grouped by feature with comments.
// This function gets called once from server.js and registers every route
// on the `app` (Fastify instance) it's given.

const bcrypt = require('bcrypt');
const { User, Slot, Vehicle, Rate, ParkingSession } = require('./models');
const { requireLogin, requireAdmin } = require('./auth');
const { calculateBill } = require('./billing');
const { sendReceipt } = require('./mailer');

function registerRoutes(app) {
  // ===== AUTH =====

  // Staff/admin login. Returns a JWT the frontend attaches to future requests.
  app.post('/api/login', async (request, reply) => {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.code(401).send({ error: 'Wrong email or password' });
    }

    const token = app.jwt.sign({ id: user.id, name: user.name, role: user.role });
    return { token, user: { id: user.id, name: user.name, role: user.role } };
  });

  // ===== SLOTS (the availability dashboard) =====

  app.get('/api/slots', async (request, reply) => {
    const slots = await Slot.findAll({ order: [['slotNumber', 'ASC']] });
    return { slots };
  });

  // ===== RATES =====

  app.get('/api/rates', async (request, reply) => {
    const rates = await Rate.findAll();
    return { rates };
  });

  // ===== CHECK-IN / CHECK-OUT (staff only) =====

  app.post('/api/checkin', { preHandler: [requireLogin] }, async (request, reply) => {
    const { plateNumber, vehicleType, slotId, ownerEmail } = request.body;

    const slot = await Slot.findByPk(slotId);
    if (!slot || slot.status !== 'available') {
      return reply.code(400).send({ error: 'That slot is not available' });
    }

    // Reuse the vehicle record if we've seen this plate before, otherwise create it.
    let vehicle = await Vehicle.findOne({ where: { plateNumber } });
    if (!vehicle) {
      vehicle = await Vehicle.create({ plateNumber, type: vehicleType, ownerEmail });
    }

    const session = await ParkingSession.create({
      SlotId: slot.id,
      VehicleId: vehicle.id,
      checkInTime: new Date(),
      status: 'active'
    });

    slot.status = 'occupied';
    await slot.save();

    return { session, vehicle, slot };
  });

  app.get('/api/active-sessions', { preHandler: [requireLogin] }, async (request, reply) => {
    const sessions = await ParkingSession.findAll({
      where: { status: 'active' },
      include: [Slot, Vehicle]
    });
    return { sessions };
  });

  app.post('/api/checkout/:sessionId', { preHandler: [requireLogin] }, async (request, reply) => {
    const session = await ParkingSession.findByPk(request.params.sessionId, {
      include: [Slot, Vehicle]
    });
    if (!session || session.status !== 'active') {
      return reply.code(400).send({ error: 'Session not found or already checked out' });
    }

    const rate = await Rate.findOne({ where: { vehicleType: session.Vehicle.type } });
    const checkOutTime = new Date();
    const amount = calculateBill(session.checkInTime, checkOutTime, rate);

    session.checkOutTime = checkOutTime;
    session.amount = amount;
    session.status = 'completed';
    await session.save();

    session.Slot.status = 'available';
    await session.Slot.save();

    // Fire-and-forget: don't make checkout fail if email sending has a problem.
    sendReceipt(session.Vehicle.ownerEmail, session.Vehicle.plateNumber, amount).catch((err) =>
      console.error('Email failed:', err.message)
    );

    return { session, amount };
  });

  // ===== CUSTOMER LOOKUP (public - no login needed) =====

  app.get('/api/lookup/:plateNumber', async (request, reply) => {
    const vehicle = await Vehicle.findOne({ where: { plateNumber: request.params.plateNumber } });
    if (!vehicle) return reply.code(404).send({ error: 'No vehicle found with that plate' });

    const activeSession = await ParkingSession.findOne({
      where: { VehicleId: vehicle.id, status: 'active' },
      include: [Slot]
    });

    let liveBill = null;
    if (activeSession) {
      const rate = await Rate.findOne({ where: { vehicleType: vehicle.type } });
      liveBill = calculateBill(activeSession.checkInTime, new Date(), rate);
    }

    const history = await ParkingSession.findAll({
      where: { VehicleId: vehicle.id, status: 'completed' },
      include: [Slot],
      order: [['checkOutTime', 'DESC']],
      limit: 5
    });

    return { vehicle, activeSession, liveBill, history };
  });

  // ===== RESERVED-SLOT BOOKING (bonus feature, staff only) =====

  app.post('/api/bookings', { preHandler: [requireLogin] }, async (request, reply) => {
    const { plateNumber, vehicleType, slotId, reservedFrom, reservedTo } = request.body;

    const slot = await Slot.findByPk(slotId);
    if (!slot || slot.status !== 'available') {
      return reply.code(400).send({ error: 'That slot is not available' });
    }

    let vehicle = await Vehicle.findOne({ where: { plateNumber } });
    if (!vehicle) vehicle = await Vehicle.create({ plateNumber, type: vehicleType });

    const booking = await ParkingSession.create({
      SlotId: slot.id,
      VehicleId: vehicle.id,
      status: 'reserved',
      reservedFrom,
      reservedTo,
      checkInTime: reservedFrom
    });

    slot.status = 'reserved';
    await slot.save();

    return { booking };
  });

  app.get('/api/bookings', { preHandler: [requireLogin] }, async (request, reply) => {
    const bookings = await ParkingSession.findAll({
      where: { status: 'reserved' },
      include: [Slot, Vehicle]
    });
    return { bookings };
  });

  app.post('/api/bookings/:id/activate', { preHandler: [requireLogin] }, async (request, reply) => {
    const booking = await ParkingSession.findByPk(request.params.id, { include: [Slot] });
    if (!booking) return reply.code(404).send({ error: 'Booking not found' });

    booking.status = 'active';
    booking.checkInTime = new Date();
    await booking.save();

    booking.Slot.status = 'occupied';
    await booking.Slot.save();

    return { booking };
  });

  // ===== ADMIN REPORTS =====

  app.get('/api/reports/occupancy', { preHandler: [requireAdmin] }, async (request, reply) => {
    const allSlots = await Slot.findAll();
    const summary = { available: 0, occupied: 0, reserved: 0 };
    allSlots.forEach((s) => { summary[s.status] = (summary[s.status] || 0) + 1; });

    return {
      total: allSlots.length,
      ...summary,
      occupancyRate: allSlots.length
        ? Math.round((summary.occupied / allSlots.length) * 1000) / 10
        : 0
    };
  });

  app.get('/api/reports/revenue', { preHandler: [requireAdmin] }, async (request, reply) => {
    const today = new Date().toISOString().slice(0, 10);
    const sessions = await ParkingSession.findAll({
      where: { status: 'completed' },
      include: [Vehicle]
    });

    // Simple in-memory filter for "today" - fine at this scale, easy to read.
    const todaysSessions = sessions.filter(
      (s) => new Date(s.checkOutTime).toISOString().slice(0, 10) === today
    );

    const totalRevenue = todaysSessions.reduce((sum, s) => sum + s.amount, 0);
    const byType = {};
    todaysSessions.forEach((s) => {
      byType[s.Vehicle.type] = (byType[s.Vehicle.type] || 0) + s.amount;
    });

    return { date: today, totalRevenue, totalSessions: todaysSessions.length, byType };
  });
}

module.exports = registerRoutes;
