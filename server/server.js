const app = require("./src/app")
const dotenv = require("dotenv")

dotenv.config()

PORT = process.env.PORT || 8000


app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})