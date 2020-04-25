import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./css/Questionnaire.css"
import api from "../api/post";
import util from "../util/utilities";
import QuestionnaireResource from '../fhir/Questionnaire';

const Questionnaire = () => {

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmiResult, setBmiResult] = useState(0);
  const patientId = util.getParameterFromUrl("patient")

  return (
    <div className={"Card"}>
      <h4>Patient ID : {patientId} </h4>
      <h3>{QuestionnaireResource.title}</h3>
      <TextField label={QuestionnaireResource.item[0].text} type="decimal"
                 onChange={event => setHeight(event.target.value)}/>
      <br/><br/>
      <TextField label={QuestionnaireResource.item[1].text}
                 onChange={event => setWeight(event.target.value)}/>
      <br/>
      <br/>
      <br/>
      <Button className={"t3"} variant="contained" color="primary"
              onClick={async () => setBmiResult(await calculate_bmi(height, weight, patientId))}>Calculate</Button>
      <br/>

      <p> Your BMI is: {bmiResult}</p>
    </div>
  )
};

const calculate_bmi = async (height, weight, patientId) => {
  const questionnaireRandomId = "QUESTIONNAIRE" + util.uuidGenerate();
  const data = {
    resourceType: "QuestionnaireResponse",
    questionnaire: `Questionnaire/${QuestionnaireResource.id}`,
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

  const response = await api.postRequest(`http://localhost:3001/bmi/calculation?patient=${patientId}`, data)
  return response.valueQuantity.value
};


export default Questionnaire