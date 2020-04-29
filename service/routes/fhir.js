const express = require('express');
const router = express.Router();
const questionnaireJson = require('../fhir/Questionnaire.json');

router.get(`/questionnaire/${questionnaireJson.id}`, (req, res) => {
  res.json(questionnaireJson)
});

module.exports = router;