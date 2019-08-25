const nodemailer = require('nodemailer');

const config = require('config');
const logger = require('../utils/logger');

const { domain } = config.get('frontEnd');

// TODO There's a way to do this with SMTP which will send from arcc.ai but I'm too lazy to setup right now :)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'caelinsutch@gmail.com',
    pass: 'Coolstar20!',
  },
});

function doSend(email, subject, html) {
  const mailOptions = {
    from: 'caelinsutcb@arcc.ai', // sender address
    to: email, // list of receivers
    subject, // Subject line
    html, // HTML body
  };
  transporter.sendMail(mailOptions,  (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
  return Promise.resolve(true);
}

// TODO Get cool email reset template going here @Alden I'm looking at you
function sendResetPasswordEmail(email, fullName, token) {
  const html = `Hello ${fullName},`
  + '\nWe have received password reset request. '
  + `To do this, please proceed at ${domain}/#/auth/reset-password?reset_password_token=${token}`
  + '\nIf it wasn\'t you, take no action or contact support.'
  + '\n\nThank you,'
  + '\nSupport team at ARCC.';

  return doSend(email, 'Reset Password', html);
}

module.exports = {
  sendResetPasswordEmail,
};
