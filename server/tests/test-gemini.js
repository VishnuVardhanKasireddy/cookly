require("dotenv").config()

const {generateRecipe} = require("../src/services/ai_service")

async function test_ai(){
    try {
        const recipe = await generateRecipe(
            ["eggs", "onion", "green chilli"],
            {
                cuisine: "Indian",
                servings: 2,
                difficulty: "easy"
            }
        );

        console.log(JSON.stringify(recipe, null, 2));
    } catch (error) {

        console.error("Recipe generation failed:", error.message);
        process.exitCode = 1;
    }
}

test_ai()