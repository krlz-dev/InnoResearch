const express = require('express');
const router = express.Router();
const observation = require('../models');
const features = require('../features')
const models = require('../models/')
const database = require('../database/dao')
const questionnaire = require('../fhir/Questionnaire.json')
router.post('/calculation/:patient', async (req, res) => {
  const patientId = req.params.patient
  let questionnaireResponse = req.body
  let calculationResult = features.bmiCalculation(questionnaireResponse)
  let observationResult = observation.observationBmi(calculationResult)
  let questionnaireBundle = models.questionnaireBundle(questionnaire, questionnaireResponse, observationResult)
  let storeData = await database.storeBundle(patientId, JSON.stringify(questionnaireBundle))
  if(storeData==="INSERT") {res.json(observationResult)}
});

module.exports = router;