exports.bmiCalculation = (QuestionnaireResponse) => {
  const height = QuestionnaireResponse.item[0].answer[0].valueDecimal;
  const weight = QuestionnaireResponse.item[1].answer[0].valueDecimal;
  return Math.floor(weight / (Math.pow((height * 0.01),2)))
};
