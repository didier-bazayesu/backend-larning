const express = require('express');
const morgan = require('morgan');   
const fs = require('fs');
const app = express(); 
const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/didier_database';
const PORT = process.env.PORT || 3000;


// IMPORTANT: Add this to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database connection string

mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 5000,
    tls: true,
    retryWrites: true
}).then((result) => {
    console.log('Connected to database');
    // Start server ONLY after database connects
   
}).catch((err) => {
    console.log('Database connection error:', err);
});

// serve static files from the "public" directory
app.use(express.static('public'));
app.use(morgan('dev'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

//importing the blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/', blogRoutes);


// error handling
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});