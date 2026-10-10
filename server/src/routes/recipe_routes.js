const express = require("express")
const { createNewRecipe,getAllRecipes,getRecipe,removeRecipe } = require("../controllers/recipe_controller")
const { validateRecipe,validateRecipeId } = require("../validation/recipe_validator")
const authenticate = require("../middlewares/authenticate")

const router = express.Router()

router.post("/",authenticate,validateRecipe,createNewRecipe)
router.get("/",authenticate,getAllRecipes)
router.get("/:id",authenticate,validateRecipeId,getRecipe)
router.delete("/:id",authenticate,validateRecipeId,removeRecipe)


module.exports = router