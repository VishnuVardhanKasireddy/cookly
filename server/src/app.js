const express = require("express")
const AppError = require("./utils/AppError")
const errorHandler = require("./middlewares/error_middleware")

const app = express()

app.use(express.json())



app.get("/health",(req,res)=>{
    res.status(200).send({
        status : "success",
        message : "server is working properly !!!"
    })
})
app.use((req,res,next)=>{
    
    next(new AppError(`can't find ${req.url} on this server!`,404))
})


app.use(errorHandler)



module.exports = app