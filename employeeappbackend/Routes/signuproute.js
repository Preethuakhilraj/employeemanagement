const express = require('express');
const router = express.Router();
const usermodel = require('../model/usermodel');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
require('../connection/connection');

router.post('/', async (req, res) => {
  try {
    const { username, password, role, email, phone } = req.body;
    if (!username || !password || !role || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password before saving
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
    const newEmployee = new usermodel({
      username,
      password:hashedPassword,
      role,
      email,
      phone
    });
    console.log(newEmployee.password);
    await newEmployee.save();
    res.status(201).json(newEmployee); // Status code 201 for successful creation
  } catch (err) {
    console.error('Error adding new employee:', err);
    res.status(500).json({ message: 'Error adding new employee', error: err.message });
  }
});

module.exports = router;
