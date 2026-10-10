const { registerUser,loginUser,getCurrentUser } = require("../controllers/auth_controller")
const { validateRegister,validateLogin } = require("../validation/auth_validator")
const authenticate = require("../middlewares/authenticate")
const express = require("express")

const router = express.Router()

router.post("/register",validateRegister,registerUser)
router.post("/login",validateLogin,loginUser)

router.get("/me",authenticate,getCurrentUser)


module.exports = router
