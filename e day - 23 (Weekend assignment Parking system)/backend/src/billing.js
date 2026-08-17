// billing.js
// One function that works out how much a vehicle owes.
// Rule: the first hour (or any part of it) costs `baseRate`.
// Every extra hour (or part of it) costs `ratePerHour`.

function calculateBill(checkInTime, checkOutTime, rate) {
  const minutesParked = (new Date(checkOutTime) - new Date(checkInTime)) / 60000;
  const hoursParked = Math.max(1, Math.ceil(minutesParked / 60)); // always at least 1 hour

  if (hoursParked === 1) {
    return rate.baseRate;
  }
  return rate.baseRate + (hoursParked - 1) * rate.ratePerHour;
}

module.exports = { calculateBill };
