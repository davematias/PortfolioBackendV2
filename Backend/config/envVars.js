require('dotenv').config();

console.log("receiver")
console.log(process.env.EMAIL_RECEIVER)
console.log(process.env)

module.exports.getEnvVars = () => ({
  EMAIL_RECEIVER: process.env.EMAIL_RECEIVER,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  EMAIL_SENDER_PASSWORD: process.env.EMAIL_SENDER_PASSWORD
});