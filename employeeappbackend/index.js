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

// app.use(cors({
//   origin: 'http://employeemanagement-client.vercel.app', // Frontend URL
//   credentials: true, // Allow cookies/auth headers
// }));
const corsOptions = {
  origin: ['https://employeemanagement-client.vercel.app', 'http://localhost:3000'], // Add allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
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
