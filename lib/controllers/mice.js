const { Router } = require('express');
const Mouse = require('../models/Mouse');

module.exports = Router()
  .post('/', (req, res, next) => {
    Mouse
      .insert(req.body)
      .then(mouse => res.send(mouse))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Mouse
      .find()
      .then(mice => res.send(mice))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Mouse
      .update(req.params.id, req.body)
      .then(tip => res.send(tip))
      .catch(next);
  });
