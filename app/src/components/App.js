import React, {useState} from 'react';
import './css/App.css'
import Header from './Header'
import Questionnaire from './Questionnaire'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[600],
        },
        secondary: {
            main: grey[500],
        },
    },
});

const App = () => {

    const [bmiResult] = useState(0);

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Header/>
                <div className="container">
                    <Questionnaire bmiResult={bmiResult}/>
                </div>
            </div>
        </MuiThemeProvider>

    );
};

export default App;