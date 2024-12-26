const mongoose = require('mongoose');
require('dotenv').config();

const db=mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://preethuakhilraj:preethu@cluster0.spk2oik.mongodb.net/employeeDB?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log("DB is connected");
})
.catch((error) => {
  console.error('Error in connection', error);
});

module.exports = db;