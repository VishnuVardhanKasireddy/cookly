const { createRecipe,getUserRecipes,getRecipeById,deleteRecipe } = require("../services/recipe_services")
const { generateRecipe } = require("../services/ai_service")
const searchRecipeImage = require("../services/unsplash_service");

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


const generateNewRecipe = async (req, res, next) => {
    try {
        const {
            inputIngredients,
            cuisine,
            servings,
            difficulty
        } = req.body;

        // Generate recipe using Gemini
        const recipe = await generateRecipe(inputIngredients, {
            cuisine,
            servings,
            difficulty
        });

        recipe.model = "gemini-2.5-flash";

        // Retrieve a relevant food image using Unsplash
        try {
            recipe.image = await searchRecipeImage(recipe.title);
        } catch (imageError) {
            console.error("Unsplash image retrieval failed:", imageError.message);
            recipe.image = null;
        }

        res.status(200).json({
            status: "success",
            message: "Recipe generated successfully!",
            data: {
                recipe
            }
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createNewRecipe,
    getAllRecipes,
    getRecipe,
    removeRecipe,
    generateNewRecipe
}