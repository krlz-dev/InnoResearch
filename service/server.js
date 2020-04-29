const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const database = require('./database')

app.use(express.json());

database.createSchema();

/**CORS**/
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};
/***/

/**ROUTES**/
const bmiCalculation = require('./routes/bmiCalculation');
const fhir = require('./routes/fhir');
app.use('/bmi', cors(corsOptions), bmiCalculation);

//TODO add a fhir endpoint
// app.use('/fhir', cors(corsOptions), fhir);
/***/

app.listen(port, () => console.log(`Server ready ${port}!`));