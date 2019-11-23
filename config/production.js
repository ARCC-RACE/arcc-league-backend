
module.exports = {

  api: {
    port: process.env.PORT,
    root: '',
  },

  auth: {
    jwt: {
      secret: '5edb26e5-ec21-4150-9fde-57735eabba99',
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
    url: 'mongodb://user:password1@ds153766.mlab.com:53766/arcc-league',
  },
  aws: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
};
