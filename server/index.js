require('dotenv').config()


const userRoutes =require('./routes/user')


const express=require('express')
const mongoose=require('mongoose')

const app=express();


// MIDDLEWARE 

app.use(express.json())

app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    app.listen(process.env.PORT,()=>{
        console.log('connect to db and listen on port', process.env.PORT)
    })
})
.catch((err)=>{
    console.log("server not connected")
})

 