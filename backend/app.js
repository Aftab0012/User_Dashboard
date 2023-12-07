require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./Routes/userRoute');

const app = express();
const PORT = process.env.PORT;

const DB_URI = process.env.DB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to db at, ' + DB_URI);
  })
  .catch((error) => {
    console.log(error);
  });
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // Set the preflight success status to 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
