require('dotenv').config();

module.exports.getEnvVars = () => ({
  EMAIL_RECEIVER: process.env.EMAIL_RECEIVER,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  EMAIL_SENDER_PASSWORD: process.env.EMAIL_SENDER_PASSWORD
});