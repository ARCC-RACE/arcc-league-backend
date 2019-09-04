const express = require('express');

const router = express.Router();

const ModelService = require('./modelService');

const modelService = new ModelService();

/**
 * Query database for all models
 */
router.get('/', (req, res) => {
  modelService
    .list(req.query)
    .then(models => res.send(models));
});

/**
 * Gets users models based off of their ID
 * Request must have "userId" in body
 */
router.get('/usersmodels/:id', (req, res) => {
  modelService
    .findByUserId(req.params.id)
    .then(models => res.send(models));
});

router.get('/usersmodels', (req, res) => {
  modelService
    .list(req.query)
    .then(models => res.send(models));
})

/**
 * Creates a new model
 */
router.post('/', (req, res) => {
  modelService
    .addModel(req.body)
    .then(model => res.send(model));
});

/**
 * Gets models by ID
 * Example: get to http://localhost:3001/api/models/5d6f07da58193c502aed7c0d
 * Returns model
 */
router.get('/:id', (req, res) => {
  modelService
    .findById(req.params.id)
    .then(model => res.send(model));
});

/**
 * Edits a model by ID
 */
router.put('/:id', (req, res) => {
  modelService
    .editModel(req.body, req.params.id)
    .then(model => res.send(model));
});

/**
 * Deletes Model
 */
router.delete('/:id', (req, res) => {
  modelService
    .deleteModel(req.params.id)
    .then(() => res.send({ id: req.params.id }));
});

module.exports = router;
