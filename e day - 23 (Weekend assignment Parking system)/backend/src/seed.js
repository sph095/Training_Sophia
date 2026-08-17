// seed.js
// Run with `npm run seed`. Creates one admin user, default prices,
// and a handful of starter slots, so the app is usable right away.

require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User, Slot, Rate } = require('./models');

async function seed() {
  await sequelize.sync();

  const existingAdmin = await User.findOne({ where: { email: 'admin@parking.com' } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    await User.create({ name: 'Admin', email: 'admin@parking.com', password: hashedPassword, role: 'admin' });
    console.log('Created admin: admin@parking.com / Admin@123');
  }

  await Rate.findOrCreate({ where: { vehicleType: 'bike' }, defaults: { baseRate: 10, ratePerHour: 5 } });
  await Rate.findOrCreate({ where: { vehicleType: 'car' }, defaults: { baseRate: 20, ratePerHour: 10 } });
  await Rate.findOrCreate({ where: { vehicleType: 'truck' }, defaults: { baseRate: 40, ratePerHour: 20 } });
  console.log('Rates ready');

  const slotCount = await Slot.count();
  if (slotCount === 0) {
    const slotsToCreate = [];
    for (let i = 1; i <= 10; i++) slotsToCreate.push({ slotNumber: `A${i}`, vehicleType: 'car' });
    for (let i = 1; i <= 5; i++) slotsToCreate.push({ slotNumber: `B${i}`, vehicleType: 'bike' });
    for (let i = 1; i <= 3; i++) slotsToCreate.push({ slotNumber: `C${i}`, floor: '2', vehicleType: 'truck' });
    await Slot.bulkCreate(slotsToCreate);
    console.log(`Created ${slotsToCreate.length} slots`);
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
