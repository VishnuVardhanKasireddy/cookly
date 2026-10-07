require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/db")

PORT = process.env.PORT || 8000

const startServer = async()=>{
    
    console.log("Connecting to DB............")
    await connectDB()

    app.listen(PORT,()=>{
        console.log(`server is running at http://localhost:${PORT}`)
    })

}

startServer()