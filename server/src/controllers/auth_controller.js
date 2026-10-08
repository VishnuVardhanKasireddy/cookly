const { register,login } = require("../services/auth_service")


const registerUser = async(req,res,next)=>{
   
    try{

        const user = await register(req.body)

        res.status(201).json({
            status:"success",
            message:"User registered successfully. Please log-in.....",
            data:{
                user:user
            }
        })
    }catch(error){
        next(error)
    }
}

const loginUser = async(req,res,next)=>{
    try{
        const token = await login(req.body)

        res.status(201).json({
            status:"success",
            message:"User login successfull.... Enjoy your time here!",
            data:{
                token:token
            }
        })
    }catch(error){
        next(error)
    }
}


module.exports = {
    registerUser,
    loginUser
}