const express = require('express')
const fs = require('fs/promises');
const path = require('node:path');

const app = express();
const port = 9000;


app.use(express.static('public'));
const serveStatic = require('./utils/serveStatic');


app.get('/', (req, res) => {
  
});

app.listen(port, () => {  console.log(`Server is running on port ${port}`);
});

