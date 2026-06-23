const { error } = require('console');
const fs = require('fs');

//here is the way of writing on the file 

fs.writeFile('C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\written.js', "const name ='didier'",(error)=>{
   if(error) console.log("An error occurred while writing the file:", error);
   else
    console.log("File has been written successfully.");
})


//reading the file 
const path = 'C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\written.js';

fs.readFile(path,(error,data)=>{

     if(error) console.log("An error occurred while reading the file:", error);
     else console.log(data.toString());
     console.log("File has been read successfully.");
})



//directories 
if(fs.existsSync(`C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\newDirectory`)){
    console.log("Directory already exists.");
}   
fs.mkdir(`C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\newDirectory`,(error)=>{
    if(error) console.log("An error occurred while creating the directory:", error);
    else console.log("Directory has been created successfully.");
})

// //deleting the directory
if(fs.existsSync(`C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\newDirectory`)){
    fs.rmdir(`C:\\Users\\user\\Documents\\The gym\\react-understanding\\react-project\\backend-larning\\newDirectory`,(error)=>{
        if(error) console.log("An error occurred while deleting the directory:", error);
        else console.log("Directory has been deleted successfully.");
    })
    
} else console.log("Directory does not exist.");



//delete the file
if(fs.existsSync(path)){
     fs.unlink(path,(error)=>{
        if(error) console.log("An error occurred while deleting the file:", error);
        else console.log("File has been deleted successfully."); 
    })
}else console.log("File does not exist.");