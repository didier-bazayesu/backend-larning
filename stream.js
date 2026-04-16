const fs = require('fs');
const readStream = fs.createReadStream('largeFile.txt');
const writeStream = fs.createWriteStream('copyOfLargeFile.txt');

readStream.on('data',(chunk)=>{
    console.log(`Received ${chunk.length} bytes of data.`);
    // Process the chunk of data here   
  console.log("____________NEW CHUNK_______________________");
  console.log(chunk)
   writeStream.write (`\n NEW CHUNK\n`);
   writeStream.write(chunk)
})