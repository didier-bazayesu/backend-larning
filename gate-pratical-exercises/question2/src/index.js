const express = require('express')


const app = express()
app.use(express.json())
app.use((req , res , next )=>{
    const start = Date.now()
    const date = new Date()
    console.log([date], `${req.method} ${req.url} -${Date.now() - start} ms `)
    console.log((new Date()).toString())
   next()
})
const task = [{
    id: 1,
    task: 'read',
    status: "todo"
    },
     {
    id: 2,
    task: 'write',
    status:  "done"
    }
]

app.get('/todo', (req, res)=> {
    const {status} = req.query;
    
    if(status) {
       const data = task.filter(data=> data.status === status)
       return res.status(200).json(data)

    }else{

        return res.status(200).json(task)
    }
})

app.get('/todo/:id', (req, res)=>{
    const {id} = req.params
    if(!id) return res.json({message: "no id found"})
    const data = task.find(data=> data.id === Number(id))
    return res.status(200).json(data)

})
app.post('/todo', (req, res)=>{
   const data =req.body;
     task.push(data)
   return res.json({message: "data created",data })
})


const conversationRate = {
    usd : 1300,
    eur: 1400,
    gbp: 1500

}

app.post('/convert', (req, res )=> {
    const query = req.query;
    const convertedAmount = Number(query.amount ) * conversationRate[query.currency]
    return res.status(200).json({message : "converted result", input : query , unitCost : {unit :"RWF",cost: conversationRate[query.currency]}, total: convertedAmount})
   
})



app.listen(6000, ()=> {
    console.log("The server is running on the port 6000")
})