const mongoose = require('mongoose')
require('dotenv').config()
const newsSc = new mongoose.Schema({
title:{type:String,unique:true},
source:{type:Object},
author:{type:String},
description:{type:String},
url:{type:String},
urlToImage:{type:String},
publishedAt:{type:String},
content:{type:String}
})


module.exports = mongoose.model(process.env.SCHEMA,newsSc)