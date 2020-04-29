import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./css/Questionnaire.css"
import api from "../api";
import util from "../util/utilities";
import QuestionnaireResource from "../fhir/Questionnaire.json"

const Questionnaire = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmiResult, setBmiResult] = useState(0);
  const patientId = util.getParameterFromUrl("patient")

  return (
    <div className={"Card"}>
      <h4>Patient ID : {patientId} </h4>
      <h3>{QuestionnaireResource.title}</h3>

      <TextField label={QuestionnaireResource.item[0].text}
                 style={{marginBottom: 16, display: "block"}}
                 type="number"
                 onChange={event => setHeight(event.target.value)}/>

      <TextField label={QuestionnaireResource.item[1].text}
                 style={{marginBottom: 16, display: "block"}}
                 type="number"
                 onChange={event => setWeight(event.target.value)}/>

      <Button className={"t3"} variant="contained" color="primary"
              style={{marginTop: 32, display: "block"}}
              onClick={async () => setBmiResult(await calculate_bmi(height, weight, patientId))}>Calculate</Button>

      <p style={{marginTop: 32}}> Your BMI is: {bmiResult}</p>
    </div>
  )
};

const calculate_bmi = async (height, weight, patientId) => {
  const questionnaireRandomId = "QUESTIONNAIRE" + util.uuidGenerate();
  const data = {
    resourceType: "QuestionnaireResponse",
    questionnaire: `${QuestionnaireResource.id}`,
    id: questionnaireRandomId,
    status: 'generated',
    authored: util.dateNow(),
    item: [
      {
        linkId: '1',
        text: 'Height',
        answer: [
          {
            valueDecimal: height
          }
        ]
      },
      {
        linkId: '2',
        text: 'Weight',
        answer: [
          {
            valueDecimal: weight
          }
        ]
      }
    ]
  };

  const response = await api.postRequest(`http://localhost:3001/bmi/calculation/${patientId}`, data)
  return response.valueQuantity.value
};


export default Questionnaire