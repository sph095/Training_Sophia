// db.js
// This is the ONE place we connect to PostgreSQL.
// Every other file imports `sequelize` from here so there's only ever
// one connection to the database, not a new one per file.

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false // set to console.log if you want to see the SQL it runs
  }
);

module.exports = sequelize;
