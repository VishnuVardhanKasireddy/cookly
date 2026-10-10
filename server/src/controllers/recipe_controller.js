const { createRecipe,getUserRecipes,getRecipeById,deleteRecipe } = require("../services/recipe_services")

const createNewRecipe = async(req,res,next)=>{
    try{
        const recipe = await createRecipe(req.user.id,req.body)

        res.status(201).json({
            status:"success",
            message:"Recipe created successfully!",
            data:{
                recipe
            }
        })
    }catch(error){
        next(error)
    }
}

const getAllRecipes = async(req,res,next)=>{
    try{
        const recipes = await getUserRecipes(req.user.id)

        res.status(200).json({
            status:"success",
            message:`${recipes.length} recipes are obtained`,
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
        const recipe = await getRecipeById(req.params.id,req.user.id)

        res.status(200).json({
            status:"success",
            message:"recipe retrived successfull!",
            data:{
                recipe
            }
        })
    }catch(error){
        next(error)
    }
}

const removeRecipe = async(req,res,next)=>{
    try{
        await deleteRecipe(req.params.id,req.user.id)

        res.status(200).json({
            status:"success",
            message:"recipe deleted successfully!"
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    createNewRecipe,
    getAllRecipes,
    getRecipe,
    removeRecipe
}