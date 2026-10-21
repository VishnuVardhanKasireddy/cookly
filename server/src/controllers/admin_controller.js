const AppError = require("../utils/AppError")
const { getAllUsers,getUserById,removeUser,getAllRecipes,getRecipeById,getRecipeByUser,removeRecipe } = require("../services/admin_services")


const getUsers = async(req,res,next)=>{
    try{
        const users = await getAllUsers()

        res.status(200).json({
            status:"success",
            message:`${users.length} users retrived!`,
            data:{
                users
            }
        })
    }catch(error){
        next(error)
    }
}

    const getUser = async(req,res,next)=>{
        try{
            const user = await getUserById(req.params.id)

            res.status(200).json({
                status:"success",
                message:`User with ${user._id} id is retrived!`,
                data:{
                    user
                }
            })
        }catch(error){
            next(error)
        }
    }

const deleteUser = async(req,res,next)=>{
    try{
        await removeUser(req.params.id)
        res.status(200).json({
            status:"success",
            message:"User deletion successfull"
        })
    }catch(error){
        next(error)
    }
}

const getRecipes = async(req,res,next)=>{
    try{
        const recipes = await getAllRecipes()

        res.status(200).json({
            status:"success",
            message:`${recipes.length} recipes retrived!`,
            data:{
                recipes
            }
        })
    }catch(error){
        next(error)
    }
}

const getRecipe = async(req,res,next)=>{
    try{
        const recipe = await getRecipeById(req.params.id)

        res.status(200).json({
            status:"success",
            message:`Recipe with ${recipe._id} id is retrived!`,
            data:{recipe}
        })
    }catch(error){
        next(error)
    }
}

const getUserRecipe = async(req,res,next)=>{
    try{
        const recipes = await getRecipeByUser(req.params.id)

        res.status(200).json({
            status:"success",
            message:`${recipes.length} recipes for user id ${req.params.id} retrived!`,
            data:{
                recipes
            }
        })
    }catch(error){
        next(error)
    }
}

const deleteRecipe = async(req,res,next)=>{
    try{
        await removeRecipe(req.params.id)
        res.status(200).json({
            status:"success",
            message:"Recipe deletion successfull"
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    getUsers,
    getUser,
    deleteUser,
    getRecipes,
    getRecipe,
    getUserRecipe,
    deleteRecipe
}