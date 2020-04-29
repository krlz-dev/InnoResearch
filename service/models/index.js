//TODO: The observation model should generate random id and should receive the patient id
const util = require('../util')
exports.observationBmi = (bmiValue) => {
    return {
        "resourceType": "Observation",
        "id": "observation-"+util.uuidGenerate(),
        "status": "generated",
        "issued": util.dateNow(),
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

exports.questionnaireBundle = (questionnaire, questionnaireResponse, observation) => {
    return {
        "resourceType": "Bundle",
        "id": "bundle-" + util.uuidGenerate(),
        "meta": {
            "tag": [
                {
                    "system": "http://portavita.nl/acs-patient",
                    "code": "PER-6fb7d9ae-78f3-4bd8-a78a-2f1944d8f954"
                }
            ],
            "lastUpdated": util.dateNow()
        },
        "type": "collection",
        "entry": [
            {"resource": questionnaire},
            {"resource": questionnaireResponse},
            {"resource": observation}
        ]

    }

};
