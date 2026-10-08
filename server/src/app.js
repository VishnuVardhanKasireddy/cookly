const express = require("express")
const AppError = require("./utils/AppError")
const errorHandler = require("./middlewares/error_middleware")
const authRouter = require("./routes/auth_routes")

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.originalUrl);
    next();
});
app.use("/api/auth",authRouter)

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