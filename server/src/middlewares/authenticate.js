const { verifyToken } = require("../utils/jwt")
const AppError  = require("../utils/AppError")

const authenticate = async(req,res,next)=>{
    try{
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }

        if(!token){
            return next(new AppError("Authentication is required! Please log-in"),401)
        }

        const decode = verifyToken(token)

        req.user = decode
        next()
    }catch(error){
        next(error)
    }
}

module.exports = authenticate
