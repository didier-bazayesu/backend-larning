const express = require('express');
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));


server.get("/",(req, res)=>{
    
})


server.post('/form-data', (req, res) => {
    const { email, password } = req.body;

    console.log(`Received form data: Email - ${email}, Password - ${password}`);

    setTimeout(() => {
        res.send(`
            <h2 style="background-color: #007bff; color: white; padding: 10px;">Data received successfully!</h2>
            <p style="background-color: #f8f9fa; padding: 10px;">Email: ${email}</p>
            <p style="background-color: #f8f9fa; padding: 10px;">Password: ${password}</p>
            <a href="/">Go Back</a>
        `);
    }, 1000); // wait 1 second
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});