const jwt = require("jsonwebtoken")

const generateToken = (payload)=>{

    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN || '1d'
    })
}

const verifyToken = (token)=>{

    return jwt.verify(token,process.env.JWT_SECRET_KEY)
}

module.exports = {
    generateToken,
    verifyToken 
}