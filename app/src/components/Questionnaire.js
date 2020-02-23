import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Questionnaire = () => {
    return (
        <div className="Card">
            <h3>BMI calculation</h3>
            <TextField id="standard-basic" label="Height" /> <br/> <br/>
            <TextField id="standard-basic" label="Weight" /> <br/> <br/> <br/>
            <Button variant="contained" color="primary">
                Calculate
            </Button>
        </div>
    )
};
export default Questionnaire