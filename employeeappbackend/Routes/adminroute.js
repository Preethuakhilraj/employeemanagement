const express = require('express');
const router = express.Router();
const Model = require('../model/Model');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
require('../connection/connection'); // Corrected path to your connection file
require('../Middleware/middleware'); 
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  try {
    if (!token) throw 'Unauthorized access';
    const payload = jwt.verify(token, '000');
    if (!payload) throw 'Unauthorized access';
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
}

router.get('/view', async (req, res) => {
  try {
    const dashboards = await Model.find();
     res.status(200).json(dashboards);
  } catch (err) {
    console.error('Error retrieving dashboards:', err);
    res.status(500).json({ message: 'Error retrieving dashboards', error: err.message });
  }
});

router.post('/add', verifyToken,checkRole(['admin']), async (req, res) => {
  try {
    const { name, designation, location, salary } = req.body;
    if (!name || !designation || !location || !salary) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newEmployee = new Model({ name, designation, location, salary });
    await newEmployee.save();
    console.log("newEmployee:",newEmployee);
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error adding new employee:', err);
    res.status(500).json({ message: 'Error adding new employee', error: err.message });
  }
});

router.put('/edit/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, designation, salary } = req.body;
    const updatedEmployee = await Model.findByIdAndUpdate(
      id,
      { name, location, designation, salary },
      { new: true }
    );
    if (updatedEmployee) {
      res.status(200).send('Employee data updated successfully');
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const deletedEmployee = await Model.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
});

module.exports = router;
