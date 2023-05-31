
const router = require('express').Router()
const axios = require('axios')
const newsSc = require('../models/newsSc')
require('dotenv').config()
const newsApi=async()=>{
    try {
   
 const data = await axios.get(process.env.APIKEY)


   
const newsData = await data.data.articles.map(x=>(
newsSc.create({
title:x.title,
source:x.source,
author:x.author,
description:x.description,
url:x.url,
urlToImage:x.urlToImage,
publishedAt:x.publishedAt,
content:x.content,

})


))


} catch (err) {
    console.log(err)
}
}

newsApi()

   router.get('/api', async(req,res)=>{


try {
    const q = req.query
    const data = await newsSc.find({})
   console.log(q," qry")
   await res.json(data)
   

} catch (error) {
    console.log(error)
}


   })

   router.get('/api2',async(req,res)=>{
try {
    const q2 = req.query


    let data = await newsSc.find({'source.name':Object.values(q2).toString().split(",")})
   

    await res.json(data)
} catch (error) {
    console.log(error)
    
}
   })


module.exports = router