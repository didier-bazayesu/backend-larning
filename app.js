const express = require('express');
const morgan = require('morgan');   
const fs = require('fs');
const app = express(); 
const mongoose = require('mongoose');
const Blog = require('./model/blog');
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
   
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log('Database connection error:', err);
});

// serve static files from the "public" directory
app.use(express.static('public'));
app.use(morgan('dev'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

// Home route with proper async/await
app.get('/', async (req, res) => {
    try {
        // Wait for the database query to complete
        const blogs = await Blog.find().sort({ createdAt: -1 });
        
        res.render('index', {
            title: 'About Didier',
            name: 'didier',
            email: 'didierbazayesu@gmail.com',
            blogs: blogs  // Pass the actual blogs array
        });
    } catch (err) {
        console.log('Error fetching blogs:', err);
        res.status(500).render('404', { title: 'Error' });
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

// redirect 
app.get('/about-me', (request, response) => {
    response.redirect(302, '/about');
});

// GET route - Show the form
app.get('/new-blog', (req, res) => {
    res.render('newBlog');
});

//getting the single blog 
app.get('/single-blog',(req,res)=>{
    Blog.findById('69e646e2b6f34fd6927f73a9').then(result=> res.send(result)).catch(err=> console.log(err));
})

// FIXED POST route - Corrected typos
app.post('/new-blog', async (req, res) => {  // Changed 'new-blod' to '/new-blog' and fixed parameters
    try {
        console.log('Form data received:', req.body); // Debug: see what data comes in
        
        const { title, snippet, body } = req.body;
        
        // Validate that data exists
        if (!title || !snippet || !body) {
            console.log('Missing fields:', { title, snippet, body });
            return res.status(400).send('All fields are required');
        }
        
        // Create and save the blog
        const blog = new Blog({
            title,
            snippet,
            body
        });
        
        const result = await blog.save();  // Use await for better error handling
        console.log('Blog saved successfully:', result);
        
        res.redirect('/');  // Redirect to home page
    } catch (err) {
        console.log('Error saving blog:', err);
        res.status(500).send('Error saving blog: ' + err.message);
    }
});

// error handling
app.use((req, res) => {
    res.status(404).render('404');
});