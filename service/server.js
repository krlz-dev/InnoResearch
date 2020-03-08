const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());

/**CORS**/
const corsOptions = {
  origin: ['http://localhost:3001','http://localhost:3000'],
  optionsSuccessStatus: 200
};
/***/

/**ROUTES**/
const bmiCalculation = require('./routes/bmiCalculation');
app.use('/bmi', cors(corsOptions), bmiCalculation);
/***/

app.listen(port, () => console.log(`Server ready ${port}!`));