const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('../model/usermodel');
const router = express.Router();
router.use(express.json())
router.post('/', async (req,res) => {
  try {
    const { username, password } = req.body;
    // Find the user by username
    const user = await usermodel.findOne({username: req.body.username});
    console.log(user)
    if (!user || password!==req.body.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, '000', { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
