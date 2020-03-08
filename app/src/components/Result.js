import React from 'react';

const Result = (props) => {
    return (
        <div className="Result">
            <div className="container">
               Your BMI is: {props.bmiResult}
            </div>
        </div>
    );
};

export default Result;