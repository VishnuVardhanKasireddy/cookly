const express = require("express")

const app = express()

app.use(express.json())

app.get("/health",(req,res)=>{
    res.status(200).send({
        success : "true",
        message : "server is working properly !!!"
    })
})

module.exports = app