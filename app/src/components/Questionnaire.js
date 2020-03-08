import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./css/Questionnaire.css"

const Questionnaire = () => {

    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);


    return (
        <div>
            <h3>BMI calculation</h3>
            <TextField label="Height" onChange={event => setHeight(event.target.value)}/> <br/> <br/>
            <TextField label="Weight" onChange={event => setWeight(event.target.value)}/><br/> <br/> <br/>
            <Button variant="contained" color="primary" onClick={() => calculate_bmi(height, weight)}>Calculate</Button>
        </div>
    )
};

const calculate_bmi = async (height, weight) => {



    const data = {
        resourceType: 'QuestionnaireResponse',
        id: 'QuestionnaireResponse-26ed7ef3-25b1-4e4a-9e33-7c2c7030f25b',
        meta: {
            profile: [
                'http://Url.profile'
            ],
            tag: [
                {
                    code: 'PATIENT-ID-86893428934234',
                    system: 'http://Url.patients'
                }
            ]
        },
        identifier: {
            system: 'https://portavita.nl/questionnaire/questionnaire-response-identifier',
            value: 'QuestionnaireResponse-26ed7ef3-25b1-4e4a-9e33-7c2c7030f25b'
        },
        status: 'generated',
        authored: 'Fri Nov 29 2019 18:53:08 GMT+0300 (Moscow Standard Time)',
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

    const response = await fetch('http://localhost:3001/bmi/calculation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();

    console.log(json);

};


export default Questionnaire