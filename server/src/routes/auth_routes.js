const { registerUser,loginUser } = require("../controllers/auth_controller")
const { validateRegister,validateLogin } = require("../validation/auth_validator")
const express = require("express")

const router = express.Router()

router.post("/register",validateRegister,registerUser)
router.post("/login",validateLogin,loginUser)


module.exports = router
