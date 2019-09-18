const functions = require('firebase-functions');
// Porting envs from firebase config
const config = functions.config();
// eslint-disable-next-line guard-for-in,no-restricted-syntax
for (const key in config.envs) {
  process.env[key.toUpperCase()] = config.envs[key];
}
// Run this to setup env variables
// `firebase functions:config:set env.access_key_id=$ACCESS_KEY_ID env.access_key_secret=$ACCESS_KEY_SECRET`

// TODO implement env variables in firebae to allow default and production to work
module.exports = {

  api: {
    port: 3001,
    root: '',
  },

  frontEnd: {
    domain: 'http://localhost:4200',
  },

  auth: {
    jwt: {
      secret: '0d7c5c5f-768c-4d98-8900-13aadaa21937',
    },
    resetPassword: {
      secret: '56gXxY{+D6/4m#kZ394j2=bT2eHqTAu>r8zAT>yEn:;TM#9*Vg',
      ttl: 86400 * 1000, // 1 day
      algorithm: 'aes256',
      inputEncoding: 'utf8',
      outputEncoding: 'hex',
    },
  },

  db: {
    // eslint-disable-next-line max-len
    url: 'mongodb://127.0.0.1:27017',
    name: 'bundle-node',
  },

  logger: {
    console: {
      level: 'debug',
    },
    file: {
      logDir: 'logs',
      logFile: 'bundle_node.log',
      level: 'debug',
      maxsize: 1024 * 1024 * 10, // 10MB
      maxFiles: 5,
    },
  },

  aws: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
};
