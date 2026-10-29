const express = require("express")
const { createNewRecipe,getAllRecipes,getRecipe,removeRecipe,generateNewRecipe } = require("../controllers/recipe_controller")
const { validateRecipe,validateRecipeId,validateRecipeGeneration } = require("../validation/recipe_validator")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/authorize")

const router = express.Router()

router.post("/",authenticate,authorize(["user","admin"]),validateRecipe,createNewRecipe)
router.post("/generate",authenticate,authorize(["user","admin"]),validateRecipeGeneration,generateNewRecipe)
router.get("/",authenticate,authorize(["user","admin"]),getAllRecipes)
router.get("/:id",authenticate,authorize(["user","admin"]),validateRecipeId,getRecipe)
router.delete("/:id",authenticate,authorize(["user","admin"]),validateRecipeId,removeRecipe)


module.exports = router 