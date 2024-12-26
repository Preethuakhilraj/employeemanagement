const express = require('express');
const router = express.Router();
const Model = require('../model/Model'); // Ensure the correct path to your model file

require('../connection/connection'); // Ensure the correct path to your connection file

router.get('/view', async (req, res) => {
    try {
        const dashboards = await Model.find();
        res.status(200).json(dashboards);
    } catch (err) {
        console.error('Error retrieving dashboards:', err);
        res.status(500).json({ message: 'Failed to retrieve dashboards', error: err.message });
    }
});

module.exports = router;
