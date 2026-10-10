const { body,param,validationResult } = require("express-validator")
const AppError = require("../utils/AppError")

const handleValidationError = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(err => ({
            field: err.path,
            value: err.value,
            message: err.msg
        }))
        return next(new AppError(`Validation Failed : ${JSON.stringify(errorMessages)}`,400))
    }
    next()
}

const validateRecipe = [
    body("title").trim().notEmpty().withMessage("Recipe title is required").isString().withMessage("Title must be string"),

    body("description").optional().isString().withMessage("Description must be a string"),

    body("inputIngredients").optional().isArray().withMessage("Input ingredients must be in an array"),
    body("inputIngredients.*").optional().isString().withMessage("Each ingredient must be a string"),

    body("ingredients").isArray({min:1}).withMessage("Ingredients must be a non-empty array"),
    body("ingredients.*.name").trim().notEmpty().withMessage("Ingredient name must be non-empty").isString().withMessage("Ingredient name must be a string"),
    body("ingredients.*.quantity").optional().custom((value)=>{
        if(typeof value!=="string" && typeof value!=="number")
            throw new Error("Ingredients quantity must be string or a number")
        return true
    }),
    body("ingredients.*.unit").optional().isString().withMessage("Ingredients unit must be a string"),

    body("instructions").isArray({min:1}).withMessage("Instructions must be a non-empty array"),
    body("instructions.*.step").isInt({min:1}).withMessage("Instructions step must be a number"),
    body("instructions.*.description").trim().notEmpty().withMessage("Instruction description must not be empty").isString().withMessage("Instruction description must be a string type"),

    body("cuisine").optional().isString().withMessage("Cuisine must be a string type"),

    body("servings").optional().isInt({min:1}).withMessage("Servings must be a number type"),

    body("prepTime").optional().isNumeric().withMessage("Preparation time must be a number"),

    body("cookTime").optional().isNumeric().withMessage("Cook time must be number"),

    body("difficulty").optional().isIn(["easy","medium","hard"]).withMessage("Difficulty must be either easy,medium or hard"),

    body("model").optional().isString().withMessage("Model must be a string"),

    handleValidationError
]

const validateRecipeId = [
    param("id")
    .isMongoId()
    .withMessage("Invalid recipe Id format"),

    handleValidationError
]

module.exports = {
    validateRecipe,
    validateRecipeId
}