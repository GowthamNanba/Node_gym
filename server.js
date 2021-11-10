const express= require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv =require('dotenv')
const routesUrl=require('./routes/routes')
const cors=require('cors')

dotenv.config()
app.use(express.json())

//mongoose.connect(process.env.ATLAS_URI,()=>console.log("Db Connceted"))

app.use(express.json())
app.use(cors())
app.use('/api',routesUrl)
app.listen(6000,()=> console.log("Server On"))