async function notifyAdmins(message) {
  try {
    await transporter.sendMail({
      from: '"Awesome API Monitor" <monitor@example.com>',
      to: 'admin1@example.com,admin2@example.com',
      subject: 'URGENT: Environment variable missing',
      text: message,
    });
    console.log('✅ Admins notified');
  } catch (err) {
    console.error('❌ Failed to send admin email', err);
  }
}


async function sendWelcomeEmail(userEmail) {
  try {
    await transporter.sendMail({
      from: '"Awesome API" <noreply@example.com>',
      to: userEmail,
      subject: 'Welcome to Awesome API',
      text: 'Welcome to Awesome API! We are glad to have you.',
    });
    console.log(`✅ Welcome email sent to ${userEmail}`);
  } catch (err) {
    console.error('❌ Failed to send welcome email', err);
  }
}

module.exports = {
  notifyAdmins,
  sendWelcomeEmail,
};