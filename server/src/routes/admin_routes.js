const express = require("express")
const { getUsers,getUser,deleteUser,getRecipe,getRecipes,getUserRecipe,deleteRecipe } = require("../controllers/admin_controller")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/authorize")

const router = express.Router()

router.get("/users",authenticate,authorize(["admin"]),getUsers)
router.get("/users/:id",authenticate,authorize(["admin"]),getUser)
router.get("/users/:id/recipes",authenticate,authorize(["admin"]),getUserRecipe)
router.delete("/users/:id",authenticate,authorize(["admin"]),deleteUser)

router.get("/recipes",authenticate,authorize(["admin"]),getRecipes)
router.get("/recipes/:id",authenticate,authorize(["admin"]),getRecipe)
router.delete("/recipes/:id",authenticate,authorize(["admin"]),deleteRecipe)



module.exports = router