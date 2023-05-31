const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()


app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONGODB).then(()=>{console.log("DB connected")}).catch((err)=>{console.log(err)})


const newsApi = require('./routes/newsApi')
app.use('/',newsApi)
app.listen(4000,()=>{
    console.log("server.js side flow")
})