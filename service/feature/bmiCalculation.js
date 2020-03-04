exports.bmiCalculation = (weight, height) => {
  return Math.floor(weight / ((height * 0.01) ^ 2))
};
