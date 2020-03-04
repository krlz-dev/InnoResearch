const express = require('express');
const router = express.Router();
const observation = require('../models/Observation');
const calculation = require('../feature/bmiCalculation');

router.post('/calculation', (req, res) => {
  const height =req.body.item[0].answer[0].valueDecimal;
  const weight =req.body.item[1].answer[0].valueDecimal;
  res.json(observation.observationBmi(calculation.bmiCalculation(weight, height)))
});

module.exports = router;