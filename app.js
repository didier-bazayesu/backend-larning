const express = require('express');
const fs = require('fs');
const app = express(); 




//creating route 

app.set('view engine','ejs'); // set the view engine to ejs
app.set('views',__dirname + '/view'); // set the views directory

app.get('/',(req,res)=>{
    // res.sendFile('./view/index.html',{root:__dirname});
    res.render('index',{title:'About Didier' , name: 'didier', email: 'didierbazayesu@gmail.com'}); // render the index.ejs file and pass data to it
})

app.get('/about',(__,res)=>{
    res.render('about');
})

//redirect 
app.get('/about-me', (request , response)=>{
    response.redirect(302,'/about');
})

//error handling
app.use((req,res)=>{
    res.status(404).render('404.ejs');
})  
  
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})