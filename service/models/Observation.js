//TODO: The observation model should generate random id and should receive the patient id
exports.observationBmi = (bmiValue) => {
  return {
    "resourceType": "Observation",
    "id": "OBSERVATION-86893428934234",
    "subject": {
      "reference": "Patient/example",
      "display": "Bruce Wayne"
    },
    "text": {
      "status": "generated"
    },
    "status": "final",
    "code": {
      "coding": [
        {
          "system": "http://example.org/bmi",
          "code": "INNOBMI",
          "display": "BMI calculation"
        }
      ],
      "text": "Body Mass Index, (BMI)"
    },

    "effectiveDateTime": "2014-12-11T04:44:16Z",
    "valueQuantity": {
      "value": bmiValue,
      "system": "http://example.org/bmi"
    },
    "derivedFrom": [
      {
        "reference": "QuestionnaireResponse/bmi",
        "display": "BMI calculation results"
      }
    ]
  }

};
