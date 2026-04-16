const fs = require('fs');

//here is the way of writing on the file 

// fs.writeFile('C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\written.js', "const name ='didier'",(error)=>{
//    if(error) console.log("An error occurred while writing the file:", error);
//    else
//     console.log("File has been written successfully.");
// })


//reading the file 
const path = 'C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\written.js';

fs.readFile(path,(error,data)=>{

     if(error) console.log("An error occurred while reading the file:", error);
     else console.log(data.toString());
     console.log("File has been read successfully.");
})