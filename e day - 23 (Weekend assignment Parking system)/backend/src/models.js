// models.js
// All 5 database tables live in this one file, so you can see every field
// and every relationship at a glance instead of jumping between files.

const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// --- Staff / Admin accounts (people who can log in) ---
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING, // stored as a bcrypt hash, never plain text
  role: { type: DataTypes.STRING, defaultValue: 'staff' } // 'staff' or 'admin'
});

// --- A physical parking spot ---
const Slot = sequelize.define('Slot', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  slotNumber: { type: DataTypes.STRING, unique: true },
  floor: { type: DataTypes.STRING, defaultValue: '1' },
  vehicleType: { type: DataTypes.STRING, defaultValue: 'car' }, // car / bike / truck
  status: { type: DataTypes.STRING, defaultValue: 'available' } // available / occupied / reserved
});

// --- A vehicle that has visited ---
const Vehicle = sequelize.define('Vehicle', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  plateNumber: { type: DataTypes.STRING, unique: true },
  type: { type: DataTypes.STRING, defaultValue: 'car' },
  ownerEmail: DataTypes.STRING // optional, used for the receipt email
});

// --- Pricing rules, one row per vehicle type ---
const Rate = sequelize.define('Rate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vehicleType: { type: DataTypes.STRING, unique: true },
  baseRate: { type: DataTypes.FLOAT, defaultValue: 20 },   // covers the first hour
  ratePerHour: { type: DataTypes.FLOAT, defaultValue: 10 } // every hour after that
});

// --- One row per visit: check-in, check-out, and the bill ---
const ParkingSession = sequelize.define('ParkingSession', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  checkInTime: DataTypes.DATE,
  checkOutTime: DataTypes.DATE,
  status: { type: DataTypes.STRING, defaultValue: 'active' }, // reserved / active / completed
  amount: DataTypes.FLOAT,
  reservedFrom: DataTypes.DATE,
  reservedTo: DataTypes.DATE
});

// --- How the tables relate to each other ---
// A slot can have many sessions over time; each session belongs to one slot.
Slot.hasMany(ParkingSession);
ParkingSession.belongsTo(Slot);

// A vehicle can have many sessions over time; each session belongs to one vehicle.
Vehicle.hasMany(ParkingSession);
ParkingSession.belongsTo(Vehicle);

module.exports = { sequelize, User, Slot, Vehicle, Rate, ParkingSession };
