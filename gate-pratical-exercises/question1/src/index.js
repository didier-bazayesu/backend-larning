const dotenv = require('dotenv')
dotenv.config()

const http = require('http')
const fs = require('fs/promises')
const path = require('path')



const filePath = path.join(__dirname, 'input.txt')
const filePath2 = path.join(__dirname, 'output.txt')


async function readFile (){
    const data = await fs.readFile(filePath, 'utf8')
    return data;
    
}

async function WriteToFile (data){
     await fs.writeFile(filePath2,data, 'utf8')
     return;
   
}



const server = http.createServer(async  (req, res)=>{

    if(req.method =='GET' && req.url =='/'){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        const data = await readFile()
        res.end(data)
    }
      
    if(req.method=="POST" && req.url=='/'){
         let body ='';
         req.on('data', (chunk)=>{
            body+=chunk;

         })
         req.on("end",async ()=>{
            await WriteToFile (body)
            console.log(body)
            res.writeHead(200, {'content-type': "application/json"})
            res.end(JSON.stringify({message: "data written "}))
         })

    }
})


server.listen(process.env.PORT, ()=>{
    console.log(process.env.message,process.env.PORT)
})