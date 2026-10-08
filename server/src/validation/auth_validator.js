const AppError = require("../utils/AppError")

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateRegister = (req,res,next)=>{
    
    const {name,email,password} = req.body

    if(!name || typeof name !== "string" || name.trim()=='')
        return next(new AppError("Please provide valid name",400))

    if(!email || !emailRegex.test(email.trim()))
        return next(new AppError("Please provide valid email address",400))

    if(!password || typeof password !== "string" || password.length<6)
        return next(new AppError("Please provide valid password",400))
   
    next()
}

const validateLogin = (req,res,next)=>{
    const {email,password} = req.body

    if(!email || emailRegex.test(email.trim()))
        return next(new AppError("Please check your email address",400))
    if(!password || typeof password !== "string" || password.trim()=='')
        return next(new AppError("Please check your password",400))

    next()
}

module.exports = {
    validateLogin,
    validateRegister
}