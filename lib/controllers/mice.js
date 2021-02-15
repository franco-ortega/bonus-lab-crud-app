const { Router } = require('express');
const Mouse = require('../models/Mouse');

module.exports = Router()
  .post('/', (req, res, next) => {
    Mouse
      .insert(req.body)
      .then(mouse => res.send(mouse))
      .catch(next);
  });
