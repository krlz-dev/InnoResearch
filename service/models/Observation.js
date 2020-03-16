//TODO: The observation model should generate random id and should receive the patient id
exports.observationBmi = (bmiValue) => {
    return {
        "resourceType": "Observation",
        "id": "UniqueId",
        "status": "generated",
        "issued": Date.now,
        "valueQuantity": {
            "value": bmiValue,
            "code": "cm/kg^2"
        },
        "derivedFrom": [
            {
                "reference": "QuestionnaireResponse-UniqueId",
                "display": "BMI calculation results"
            }
        ]
    }

};
