const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

require('./connection/connection');

const employeeroute = require('./Routes/employeeroute');
const adminroute = require('./Routes/adminroute');
const signuproute = require('./Routes/signuproute');
const loginroute = require('./Routes/login');

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies/auth headers
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', employeeroute);
app.use('/admin', adminroute);
app.use('/signup', signuproute);
app.use('/login', loginroute);
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server Connection error!");
  } else {
    console.log(`Server Listening at Port ${PORT}`);
  }
});
