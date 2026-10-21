    const User = require("../models/User")
    const Recipe = require("../models/Recipe")
    const AppError = require("../utils/AppError")

    const getAllUsers = async()=>{
        const users = await User.find().select("-password").sort({createdAt:-1})

        return users
    }

    const getUserById = async(userId)=>{
        const user = await User.find({userId}).select("-password")

        if(!user){
            throw new AppError("No User Found!",404)
        }

        return user
    }

    const removeUser = async(userId)=>{
        const user = await User.findOneAndDelete({userId})
    }

    const getAllRecipes = async()=>{
        const recipes = await Recipe.find().populate("userId","name email").sort({createdAt:-1})

        return recipes
    }

    const getRecipeByUser = async(userId)=>{
        const recipes = await Recipe.find({userId})

        if(!recipes){
            throw new AppError("Invalid user!",401)
        }

        return recipes
    }

    const getRecipeById = async(recipeId)=>{
        const recipe = await Recipe.find({recipeId})

        if(!recipe){
            throw new AppError("Invalid recipe id",401)
        }
        return recipe
    }

    const removeRecipe = async(recipeId)=>{

        const recipe = await Recipe.findOneAndDelete({recipeId})
    }



    module.exports = {
        getAllUsers,
        getUserById,
        removeUser,
        getAllRecipes,
        getRecipeById,
        getRecipeByUser,
        removeRecipe
    }