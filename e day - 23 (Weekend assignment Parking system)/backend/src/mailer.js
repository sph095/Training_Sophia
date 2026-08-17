// mailer.js
// Sends the checkout receipt email. If no SMTP settings are in .env,
// it just skips sending instead of crashing - email is a bonus feature,
// it should never break checkout.

const nodemailer = require('nodemailer');

async function sendReceipt(toEmail, plateNumber, amount) {
  if (!process.env.SMTP_HOST || !toEmail) {
    console.log(`(Skipping email - no SMTP configured, or no owner email for ${plateNumber})`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: toEmail,
    subject: `Parking Receipt - ${plateNumber}`,
    text: `Thanks for parking with us! Your total was ₹${amount}.`
  });
}

module.exports = { sendReceipt };
