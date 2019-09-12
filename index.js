const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const passport = require('passport');
const logger = require('./src/utils/logger');

require('./src/passport');

// common controllers
const authController = require('./src/api/common/auth/authController');
const userController = require('./src/api/common/user/userController');
const settingsController = require('./src/api/common/settings/settingsController');
const modelController = require('./src/api/common/model/modelController');

const SeedService = require('./src/api/seedService');

const seedService = new SeedService();


const app = express();
admin.initializeApp();

const { port, root } = config.get('api');

function logErrors(err, req, res, next) {
  logger.error(err);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something went wrong.' });
  } else {
    next(err);
  }
}

app.use(cors());
app.use(bodyParser.json());

const auth = passport.authenticate('jwt', { session: false });

// seed data in case of empty data base
seedService.checkAndSeed();

// routes for common controllers
app.use(`/auth`, authController);
app.use(`/users`, userController);
app.use(`/settings`, auth, settingsController);
app.use(`/models`, modelController);


app.use(logErrors);
app.use(clientErrorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);

logger.info(`Server start listening port: ${port}`);

const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // Prepend '/' to keep query params if any
  }

  return app(request, response);
});

// Configure Firebase Server
module.exports = {
  api,
};
