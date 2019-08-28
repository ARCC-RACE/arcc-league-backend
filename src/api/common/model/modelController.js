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
 * Get current users models
 */
router.get('/current', (req, res) => {
  modelService
    .findById(req.user.id)
    .then(models => res.send(models))
})

/**
 * Gets models by ID
 */
router.get('/:id', (req, res) => {

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
 * Edits a model by ID
 */
router.put('/:id', (req, res) => {

})

module.exports = router;
