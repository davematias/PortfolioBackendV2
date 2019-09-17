const dotenv = require('dotenv');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config();

module.exports.getEnvVars = () => ({
  EMAIL_RECEIVER: process.env.EMAIL_RECEIVER,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  EMAIL_SENDER_PASSWORD: process.env.EMAIL_SENDER_PASSWORD
});