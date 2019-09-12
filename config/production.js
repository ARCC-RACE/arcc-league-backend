

module.exports = {

  api: {
    port: 3002,
    root: '/',
  },

  auth: {
    jwt: {
      secret: '5edb26e5-ec21-4150-9fde-57735eabba99',
    },
    resetPassword: {
      secret: '27e048c1-5575-4807-873e-5b3775419286',
    },
  },

  db: {
    // eslint-disable-next-line max-len
    url: 'mongodb://arcc-league:FymHoW7Mv0wyNYHKpsYFy3NaSIfJc7ZbXLMUzfuXCO0NUpONHUelxAtFjgKdyt5vsvTsJFP7G2TIKKt1l9Z8iw==@arcc-league.documents.azure.com:10255/?ssl=true',
    name: 'bundle-node-prod',
  },
};
