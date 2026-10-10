const Recipe = require("../models/Recipe")
const AppError = require("../utils/AppError")


const createRecipe = async(userId,recipeData)=>{

    const newRecipe = await Recipe.create({
        ...recipeData,
        userId
    })

    return newRecipe
}

const getUserRecipes = async(userId)=>{

    const recipes = await Recipe.find({userId})

    return recipes
}

const getRecipeById = async(recipeId,userId)=>{

    const recipe = await Recipe.findOne({_id:recipeId,userId})
    if(!recipe)
        throw new AppError("Recipe not found or unauthorised",404)
    return recipe
}

const deleteRecipe = async(recipeId,userId)=>{

    const recipe = await Recipe.findOneAndDelete({_id:recipeId,userId})
    if(!recipe)
        throw new AppError("Recipe not found or unauthorised",404)
    return recipe
}

module.exports = {
    createRecipe,
    getUserRecipes,
    getRecipeById,
    deleteRecipe
}