const express = require('express');
const app = express();
const PORT = process.env.PORT || 8008;
const pool = require('./config/dbconfig');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const errorHandling = require('./middleware/errorHandling');

require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());
app.use(router);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Logging
// app.use(morgan('tiny'));
app.use(morgan('common'));
// app.use(morgan('combined', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }));

// app.use(errorHandling)

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8008',
      },
    ],
  },
  apis: ['./routes/*'],
};

// Testing
app.get('/', (req, res) => {
  res.json({message: 'Hello from API'})
})

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Checking database connection
pool.connect((err, res) => {
    console.log(err);
    console.log('Connected');
});

// Starting server and info about server's port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});