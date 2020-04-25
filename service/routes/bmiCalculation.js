const express = require('express');
const router = express.Router();
const observation = require('../models/Observation');
const feature = require('../features/feature')

router.post('/calculation', (req, res) => {
  const height = req.body.item[0].answer[0].valueDecimal;
  const weight = req.body.item[1].answer[0].valueDecimal;
  const patientId = req.param('patient')
  let calculationResult = feature.bmiCalculation(weight, height)
  feature.persistenceQuestionnaireResponse(patientId, calculationResult)
  res.json(observation.observationBmi(calculationResult))
});

module.exports = router;