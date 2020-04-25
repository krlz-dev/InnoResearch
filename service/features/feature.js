exports.bmiCalculation = (weight, height) => {
  return Math.floor(weight / ((height * 0.01) ^ 2))
};

exports.persistenceQuestionnaireResponse = (patientId, data) => {
  console.log(patientId+" storing "+data)
};