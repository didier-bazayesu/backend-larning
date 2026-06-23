// database connection string
const mongoose = require('mongoose');
require('dotenv').config();
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/didier_database';

const dbConnection = mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 5000,
    tls: true,
    retryWrites: true
}).then((result) => {
    console.log('Connected to database');
    // Start server ONLY after database connects
   
}).catch((err) => {
    console.log('Database connection error:', err);
});

module.exports = dbConnection;