const express = require("express")
const cors = require("cors")
const AppError = require("./utils/AppError")
const errorHandler = require("./middlewares/error_middleware")
const authRouter = require("./routes/auth_routes")
const recipeRouter = require("./routes/recipe_routes")
const adminRouter = require("./routes/admin_routes")

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/recipes",recipeRouter)
app.use("/api/admin",adminRouter)

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