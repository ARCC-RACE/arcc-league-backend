const express = require('express');
const passport = require('passport');

const router = express.Router();

const awsHelper = require('../../../utils/aws');

const profilePictureUpload = awsHelper.profileUpload.single('image');

const UserService = require('./userService');

const userService = new UserService();
const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, (req, res) => {
  userService
    .list(req.query)
    .then(users => res.send(users));
});

router.get('/current', auth, (req, res) => {
  userService
    .findById(req.user.id)
    .then(user => res.send(user));
});

router.put('/current', auth, (req, res) => {
  userService
    .editUser(req.body)
    .then(user => res.send(user));
});

router.get('/:id', auth, (req, res) => {
  userService
    .findById(req.params.id)
    .then(user => res.send(user));
});

router.delete('/:id', auth, (req, res) => {
  userService
    .deleteUser(req.params.id)
    .then(() => res.send({ id: req.params.id }));
});

router.post('/', auth, (req, res) => {
  userService
    .addUser(req.body)
    .then(user => res.send(user));
});

router.post('/profilepicture', (req, res) => {
  profilePictureUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({ errors: [{ detail: err }] });
    }
    return res.json({ profilePictureUrl: req.file.location });
  });
});

router.put('/:id', auth, (req, res) => {
  userService
    .editUser(req.body)
    .then(user => res.send(user));
});

module.exports = router;
