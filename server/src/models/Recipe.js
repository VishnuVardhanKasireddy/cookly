const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    title:{
        type:String,
        required:[true,"Recipe title is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description recipe in one or two lines atleast"],
        trim:true
    },
    inputIngredients:{
        type:[String],
        required:[true,"input ingredients must be given"],
    },
    ingredients:[
        {
            name:{
                type:String,
                required:true,
                trim:true
            },
            quantity:{
                type:String,
                required:true,
                trim:true
            },
            unit:{
                type:String,
                required:true,
                trim:true
            }
        }
    ],
    instructions:[
        {
            step:{
                type:Number,
                required:true
            },
            description:{
                type:String,
                required:true,
                trim:true
            }
        }
    ],
    cuisine:{
        type:String,
        trim:true
    },
    servings:{
        type:Number,
        min:1
    },
    prepTime:{
        type:String,
        min:0
    },
    cookTime:{
        type:Number,
        min:0
    },
    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"]
    },
    model:{
        type:String,
        trim:true
    }

},{timestamps:true})

module.exports = mongoose.model("Recipe",recipeSchema)