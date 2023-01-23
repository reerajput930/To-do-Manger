const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const tasks = require('../router-modules/tasks')
const {connectDB} =   require('../db/connect')
require('dotenv').config()


app.use(express.static('./public'))
app.use(express.json());
app.use('/api/v1/tasks',tasks)

 
// app.get('/',(req,res)=>{
//     res.send("Task Manager")
// })

// app.get('/api/v1/tasks )         - get all the tasks
// app.post('/api/v1/tasks)         - create a new task
// app.get('/api/v1/taks/:id)       - get single task
// app.patch('/api/v1/taks/:id)     - update task
// app.delete('./api/v1/tasks/:id)  -delete task

// handing mongoose here
// server will only listen,
// when the connection to database will done
// that means after connecting to database
const start = async()=>{
    try {
         await connectDB(process.env.MONGO_URI)
         app.listen(port,()=>{
            console.log(`listening .....at port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

