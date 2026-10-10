const AppError = require("../utils/AppError")
const User = require("../models/User")
const { hashPassword,comparePassword } = require("../utils/password")
const { generateToken } = require("../utils/jwt")


const register = async(userData)=>{
    
    const {name, email, password} = userData
   
    const existUser = await User.findOne({email:email.toLowerCase().trim()})
  
    if(existUser){
        throw new AppError("User already exists with email address",400)
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
        name : name.trim(),
        email : email.toLowerCase().trim(),
        password : hashedPassword
    })
    

    return {
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            createdAt:user.createdAt
        }
}

const login = async(userData)=>{

    const {email,password} = userData

    const existUser = await User.findOne({email:email.toLowerCase().trim()})
    if(!existUser){
        throw new AppError("Invalid email or password!",401)
    }

    const isPasswordcorrect = await comparePassword(password,existUser.password)
    if(!isPasswordcorrect){
        throw new AppError("Invalid email or password!",401)
    }

    const token = await generateToken({id:existUser._id,role:existUser.role})

    return token
}

const getUser = async(userId)=>{
    const user = await User.findOne({_id:userId})

    if(!user){
        throw new AppError("No User found!",404)
    }

    return {
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        createdAt:user.createdAt
    }
}

module.exports = {
    register,
    login,
    getUser
}